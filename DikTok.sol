pragma solidity >=0.4.0 <0.7.0;

contract DikTok {
    
    struct User {
        string  user_hash;
        uint videoNums;
        uint albumNums;
        mapping (uint => uint) videos;
        mapping (uint => uint) albums;
    }

    struct Video {
        string video_hash;
        uint duration;
        uint timestamp;
        address payable author;
        uint commentsNum;
        uint gratuityNum;
        uint lableNum;
        uint16 language;
        uint8 permission;
        mapping (uint => Lable) lables;
        mapping (uint => Gratuity) gratuitys;
        mapping (uint => Comment) comments;
    }

    struct Comment {
        string content_hash;
        uint timestamp;
        uint videotimestamp;
        address author;
    }

    struct Lable {
        uint lable;
        address author;
    }

    struct Gratuity {
        uint gratuity;
        address author;
    }

    struct Album {
        string album_hash;
        address payable author;
        uint videoNum;
        mapping (uint => uint) videos;
    }

    uint public videoNum;
    uint public albumNum;
    uint public lableNum;

    string language_hash;
    address public owner;

    mapping (address => User) users;
    mapping (uint => Video) videos;
    mapping (uint => Album) albums;
    mapping (uint => string) lables;

    constructor () public{
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyVideoOwner(uint _videoId) {
        require(msg.sender == videos[_videoId].author);
        _;
    }

    function setLanguage(string memory _language) onlyOwner() public {
        language_hash = _language;
    }

    function getLanguage() view public returns (string memory){
        return language_hash;
    }

    function setMyProfile (string memory _profile) public {
        users[msg.sender].user_hash = _profile;
    }

    function getUserInfo (address _userAdd) view public returns (string memory userHash, uint userVideoNums, uint userAlbumNum, uint userGratuityCount, uint userGratuitySum) {
        uint gratuityCount = 0;
        uint gratuitySum = 0;
        for (uint i = 0; i < users[_userAdd].videoNums; i++) {
            if(videos[users[_userAdd].videos[i]].permission == 0){
                gratuityCount += videos[users[_userAdd].videos[i]].gratuityNum;
                for (uint j = 0; j < videos[users[_userAdd].videos[i]].gratuityNum; j++){
                    gratuitySum += videos[users[_userAdd].videos[i]].gratuitys[j].gratuity;
                }
            }
        }
        return (users[_userAdd].user_hash, users[_userAdd].videoNums, users[_userAdd].albumNums, gratuityCount, gratuitySum);
    }

    function publish (string memory _video, uint _duration, uint16 _languageID) public returns (uint videoId){
        videos[videoNum++] = Video(_video, _duration, now, msg.sender, 0, 0, 0, _languageID, 0);
        users[msg.sender].videos[users[msg.sender].videoNums++] = videoNum - 1;
        return videoNum - 1;
    }

    function setVideoPermission (uint _videoId, uint8 _value) onlyVideoOwner(_videoId) public {
        videos[_videoId].permission = _value;
    }

    function setVideo (uint _videoId, string memory _video, uint _duration, uint16 _languageID) onlyVideoOwner(_videoId) public {
        videos[_videoId].video_hash = _video;
        videos[_videoId].duration = _duration;
        videos[_videoId].language = _languageID;
    }

    function getVideo (uint _videoId) view public returns (string memory videoHash, uint duration, uint timestamp, address author, uint commentsNum, uint vlableNum , uint gratuityNum, uint gratuitySum) {
        require(videos[_videoId].permission == 0 || msg.sender == videos[_videoId].author);
        Video storage _video = videos[_videoId];
        for (uint i = 0; i < _video.gratuityNum; i++) gratuitySum += _video.gratuitys[i].gratuity;
        return (_video.video_hash, _video.duration, _video.timestamp, _video.author, _video.commentsNum, _video.lableNum, _video.gratuityNum, gratuitySum);
    }

    function newLables (string memory _lable) onlyOwner() public {
        lables[lableNum++] = _lable;
    }

    function setLables (uint _lableID, string memory _lable) onlyOwner() public {
        require(_lableID < lableNum);
        lables[_lableID] = _lable;
    }

    function getLables(uint _lableID)view public returns (string memory){
        return lables[_lableID];
    }

    function addLable (uint _videoId, uint _lableID) public {
        require(videos[_videoId].permission == 0 && _lableID < lableNum);
        Video storage _video = videos[_videoId];
        _video.lables[_video.lableNum++] = Lable(_lableID, msg.sender);
    }

    function getVideoLable (uint _videoId, uint _lableId) view public returns (uint lableID, string memory, address author) {
        require(videos[_videoId].permission == 0 && _lableId < lableNum);
        Lable storage _lable = videos[_videoId].lables[_lableId];
        return (_lable.lable, lables[_lable.lable], _lable.author);
    }

    function makeComment (uint _videoId, uint _videotimestamp, string memory _comment) public {
        require(videos[_videoId].permission == 0 && _videotimestamp <= videos[_videoId].duration);
        videos[_videoId].comments[videos[_videoId].commentsNum++] = Comment(_comment, now, _videotimestamp, msg.sender);
    }

    function changeCommen (uint _videoId, uint _commentId, uint _videotimestamp, string memory _comment) onlyVideoOwner(_videoId) public {
        require(videos[_videoId].permission == 0 && _videotimestamp <= videos[_videoId].duration);
        videos[_videoId].comments[_commentId].videotimestamp = _videotimestamp;
        videos[_videoId].comments[_commentId].content_hash = _comment;
        videos[_videoId].comments[_commentId].timestamp = now;
        videos[_videoId].comments[_commentId].author = msg.sender;
    }

    function getVideoComment (uint _videoId, uint _commentId) view public returns (string memory contentHash, uint timestamp, uint videotimestamp, address author) {
        require(videos[_videoId].permission == 0 || videos[_videoId].author == msg.sender);
        return (videos[_videoId].comments[_commentId].content_hash, videos[_videoId].comments[_commentId].timestamp, videos[_videoId].comments[_commentId].videotimestamp, videos[_videoId].comments[_commentId].author);
    }

    function reward (uint _videoId) public payable {
        require(videos[_videoId].permission != 0);
        videos[_videoId].author.transfer(msg.value);
        videos[_videoId].gratuitys[videos[_videoId].gratuityNum++] = Gratuity(msg.value, msg.sender);
    }

    function getGratuitys (uint _videoId, uint _gratuitysId) view public returns (address author, uint gratuity) {
        require(videos[_videoId].permission != 0);
        return (videos[_videoId].gratuitys[_gratuitysId].author, videos[_videoId].gratuitys[_gratuitysId].gratuity);
    }


    function createAlbum (string memory _album) public returns (uint albumnum) {
        albums[albumNum++] = Album(_album, msg.sender, 0);
        return albumNum - 1;
    }
    function editAlbum (uint _albumId, string memory _album) public {
        require(msg.sender == albums[_albumId].author);
        albums[_albumId].album_hash = _album;
    }
    function createAlbumVideo (uint _albumId, uint _videoId) public returns (uint videonum) {
        require(msg.sender == albums[_albumId].author);
        albums[_albumId].videos[albums[_albumId].videoNum++] = _videoId;
        return albums[_albumId].videoNum - 1;
    }
    function updateAlbumVideo (uint _albumId, uint _albumvideoId, uint _videoId) public {
        require(msg.sender == albums[_albumId].author && albums[_albumId].videoNum > _albumvideoId);
        albums[_albumId].videos[_albumvideoId] = _videoId;
    }
    function getAlbum (uint _albumId) view public returns (string memory , address author, uint videonum, uint durationSum) {
        Album storage _album = albums[_albumId];
        for (uint i = 0; 0 < _album.videoNum; i++) {
            if (videos[_album.videos[i]].permission == 0) {
                durationSum += videos[_album.videos[i]].duration;
            }
        }
        return (_album.album_hash, _album.author, _album.videoNum, durationSum);
    }
    function getAlbumVideo (uint _albumId, uint _videoId) view public returns (uint videoId, string memory, uint duration, uint timestamp, address author, uint commentsNum, uint vlableNum , uint gratuityNum, uint gratuitySum) {
        videoId = albums[_albumId].videos[_videoId];
        require(videos[videoId].permission == 0 || msg.sender == videos[videoId].author);
        Video storage _video = videos[videoId];
        for (uint i = 0; i < _video.gratuityNum; i++) gratuitySum += _video.gratuitys[i].gratuity;
        return (videoId, _video.video_hash, _video.duration, _video.timestamp, _video.author, _video.commentsNum, _video.lableNum, _video.gratuityNum, gratuitySum);
    }
}
