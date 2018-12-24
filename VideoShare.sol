pragma solidity >=0.4.22 <0.6.0;

contract VideoShare {
    struct User {
        string nickname;
        string profile;
        string avatar;
        uint videoNums;
        mapping (uint => uint) videos;
    }
    mapping(address => User) users;

    struct Video {
        string title;
        string cover;
        string videoinfo;
        string info;
        uint duration;
        uint timestamp;
        address payable author;
        uint commentsNum;
        uint gratuityNum;
        uint lableNum;
        uint fileNum;
        uint8 permission;
        mapping (uint => Videofile) videofiles;
        mapping (uint => Lable) lables;
        mapping (uint => Gratuity) gratuitys;
        mapping (uint => Comment) comments;
    }
    uint public videoNum;
    mapping(uint => Video) videos;

    struct Comment {
        string content;
        uint timestamp;
        uint videotimestamp;
        address author;
    }
    struct Lable {
        string lable;
        uint times;
    }
    struct Gratuity {
        uint gratuity;
        address author;
    }
    struct Videofile {
        string filename;
        string fileinfo;
        uint size;
        uint32 width;
        uint32 height;
        uint32 fps;
        uint8 filePermission;
    }

    struct Album {
        string title;
        string cover;
        string info;
        uint videoNum;
        mapping (uint => uint) videos;
        address payable author;
    }
    uint public albumNum;
    mapping(uint => Album) albums;

    function setMyInfo (string memory _nickname, string memory _profile, string memory _avatar) public {
        users[msg.sender] = User(_nickname, _profile, _avatar, 0);
    }
    function setMyNickname (string memory _nickname) public {
        users[msg.sender].nickname = _nickname;
    }
    function setMyProfile (string memory _profile) public {
        users[msg.sender].profile = _profile;
    }
    function setMyAvatar (string memory _avatar) public {
        users[msg.sender].avatar = _avatar;
    }
    function getUserInfo (address _userAdd) view public returns (string memory nickname, string memory profile, string memory avatar, uint videoNums) {
        return (users[_userAdd].nickname, users[_userAdd].profile, users[_userAdd].avatar, users[_userAdd].videoNums);
    }


    function publish (string memory _title, string memory _cover, string memory _videoinfo, string memory _info, uint _duration, string memory _filename, string memory _fileinfo, uint _size, uint32 _width, uint32 _height, uint32 _fps) public returns (uint articleId) {
        videos[videoNum++] = Video(_title, _cover, _videoinfo, _info, _duration, now, msg.sender, 0, 0, 0, 0, 0);
        videos[videoNum].videofiles[videos[videoNum].fileNum++] = Videofile(_filename, _fileinfo, _size, _width, _height, _fps, 0);
        users[msg.sender].videos[users[msg.sender].videoNums++] = videoNum-1;
        return videoNum-1;
	}
	function setVideoPermission(uint _videoId, uint8 _value) public {
	    if( msg.sender != videos[_videoId].author) return;
	    videos[_videoId].permission = _value;
	}
	function setVideo(uint _videoId, string memory _cover, string memory _videoinfo) public {
	    if( msg.sender != videos[_videoId].author) return;
	    videos[_videoId].cover = _cover;
	    videos[_videoId].videoinfo = _videoinfo;
	}
	function setVideoInfo(uint _videoId, string memory _title, string memory _info) public {
	    if( msg.sender != videos[_videoId].author) return;
    	videos[_videoId].title = _title;
    	videos[_videoId].info = _info;
	}
	function addVideofile(uint _videoId, string memory _filename, string memory _fileinfo, uint _size, uint32 _width, uint32 _height, uint32 _fps) public {
	    if( msg.sender != videos[_videoId].author){
	        videos[_videoId].videofiles[videos[_videoId].fileNum++] = Videofile(_filename, _fileinfo, _size, _width, _height, _fps, 1);
	    }else{
	        videos[_videoId].videofiles[videos[_videoId].fileNum++] = Videofile(_filename, _fileinfo, _size, _width, _height, _fps, 0);
	    }
	}
	function setFilePermission(uint _videoId, uint _fileId, uint8 _value) public {
	     if( msg.sender == videos[_videoId].author ){
	         videos[_videoId].videofiles[_fileId].filePermission = _value;
	     }
	}
	function getVideo (uint _videoId) view public returns (string memory title, string memory cover, string memory videoinfo,string memory info, uint timestamp, address author, uint commentsNum, uint videofiles, uint gratuitySum) {
	    if( videos[_videoId].permission != 0 && msg.sender != videos[_videoId].author ){
	         Video storage _video = videos[_videoId];
	         for (uint i = 0; i < _video.gratuityNum; i++)
	            gratuitySum += _video.gratuitys[i].gratuity;
	         return (_video.title, _video.cover,_video.videoinfo,_video.info, _video.timestamp, _video.author,_video.commentsNum, _video.fileNum, gratuitySum);
	    }
	}
	function getVideoFile (uint _videoId, uint _fileId) view public returns (string memory filename, string memory fileinfo,uint size, uint32 width, uint32 height, uint32 fps, uint fileNum){
	    if(videos[_videoId].permission != 0 && msg.sender == videos[_videoId].author || videos[_videoId].permission == 0 && videos[_videoId].videofiles[_fileId].filePermission ==0){
	        Video storage _video = videos[_videoId];
	        Videofile storage _videofile = _video.videofiles[_fileId];
	        return (_videofile.filename, _videofile.fileinfo, _videofile.size, _videofile.width, _videofile.height, _videofile.fps, _video.fileNum);
	    }else{
	         return ("", "", 0, 0, 0, 0, videos[_videoId].fileNum);
	    }
	}
	function makeLable (uint _videoId, string memory _lable) public {
	    Video storage _video = videos[_videoId];
	    for(uint i=0; i<_video.lableNum;i++){
	        if(keccak256(abi.encode(_video.lables[i].lable))==keccak256(abi.encode(_lable))){
	            _video.lables[i].times++;
	            return;
	        }
	    }
	    _video.lables[_video.lableNum++] = Lable(_lable, 1);
	}
	function makeComment (uint _videoId,uint _videotimestamp, string memory _comment) public {
	    videos[_videoId].comments[videos[_videoId].commentsNum++] = Comment(_comment, now,_videotimestamp, msg.sender);
	}

    function reward (uint _videoId) public payable  {
        videos[_videoId].author.transfer(msg.value);
        videos[_videoId].gratuityNum++;
        videos[_videoId].gratuitySum += msg.value;
    }

  function getVideoComment (uint _videoId,uint _commentId) view public returns (string memory content, uint timestamp,uint videotimestamp, address author) {
      return (videos[_videoId].comments[_commentId].content,
      videos[_videoId].comments[_commentId].timestamp,
      videos[_videoId].comments[_commentId].videotimestamp,
      videos[_videoId].comments[_commentId].author);
  }

  function getVideoLable (uint _videoId, uint _lableId) view public returns (string memory lable, uint times) {
      return (videos[_videoId].lables[_lableId].lable,
      videos[_videoId].lables[_lableId].times);
  }

}