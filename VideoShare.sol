pragma solidity >=0.4.22 <0.6.0;

contract VideoShare {
    struct User {
        string nickname;
        string profile;
        string avatar;
        uint videoNum;
        mapping (uint => uint) videos;
    }
    mapping(address => User) users;

    struct Video {
        string title;
        string cover;
        string videoinfo;
        string info;
        uint timestamp;
        address payable author;
        uint commentsNum;
        uint gratuityNum;
        uint gratuitySum;
        uint lableNum;
        uint videos;
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
        string info;
        uint size;
        uint32 width;
        uint32 height;
        uint32 fps;
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
        users[msg.sender] = User(_nickname, _profile, _avatar);
    }

    function publish (string memory _title, string memory _cover, string memory _videofile, string memory _videoinfo, string memory _info) public returns (uint articleId) {
        videos[videoNum++] = Video(_title, _cover, _videofile, _videoinfo, _info, now, msg.sender, 0, 0, 0, 0);
        return videoNum-1;
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

    function getVideo (uint _videoId) view public returns (string memory title,
    string memory videofile, string memory videoinfo,
    string memory info, uint timestamp, address author) {
        Video storage _video = videos[_videoId];
        return (_video.title, _video.videofile, _video.videoinfo,
        _video.info, _video.timestamp, _video.author);
    }

    function getVideoPreview (uint _videoId) view public returns (string memory title,
    string memory cover, uint timestamp, address author, uint commentsNum,
    uint gratuityNum, uint gratuitySum, uint lableNum) {
        Video storage _video = videos[_videoId];
        return (_video.title, _video.cover, _video.timestamp, _video.author,
        _video.commentsNum, _video.gratuityNum, _video.gratuitySum, _video.lableNum);
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

  function getUserInfo (address _userAdd) view public returns (string memory nickname, string memory profile, string memory avatar) {
      return (users[_userAdd].nickname, users[_userAdd].profile, users[_userAdd].avatar);
  }

}