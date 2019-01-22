const videoShareAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_filename",
                "type": "string"
            },
            {
                "name": "_fileinfo",
                "type": "string"
            },
            {
                "name": "_size",
                "type": "uint256"
            },
            {
                "name": "_width",
                "type": "uint32"
            },
            {
                "name": "_height",
                "type": "uint32"
            },
            {
                "name": "_fps",
                "type": "uint32"
            }
        ],
        "name": "addVideofile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_commentId",
                "type": "uint256"
            },
            {
                "name": "_videotimestamp",
                "type": "uint256"
            },
            {
                "name": "_comment",
                "type": "string"
            }
        ],
        "name": "changeCommen",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_cover",
                "type": "string"
            },
            {
                "name": "_info",
                "type": "string"
            }
        ],
        "name": "createAlbum",
        "outputs": [
            {
                "name": "albumnum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "createAlbumVideo",
        "outputs": [
            {
                "name": "videonum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_cover",
                "type": "string"
            },
            {
                "name": "_info",
                "type": "string"
            }
        ],
        "name": "editAlbum",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_videotimestamp",
                "type": "uint256"
            },
            {
                "name": "_comment",
                "type": "string"
            }
        ],
        "name": "makeComment",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_lable",
                "type": "string"
            }
        ],
        "name": "makeLable",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_cover",
                "type": "string"
            },
            {
                "name": "_videoinfo",
                "type": "string"
            },
            {
                "name": "_info",
                "type": "string"
            },
            {
                "name": "_duration",
                "type": "uint256"
            },
            {
                "name": "_filename",
                "type": "string"
            },
            {
                "name": "_fileinfo",
                "type": "string"
            },
            {
                "name": "_size",
                "type": "uint256"
            },
            {
                "name": "_width",
                "type": "uint32"
            },
            {
                "name": "_height",
                "type": "uint32"
            },
            {
                "name": "_fps",
                "type": "uint32"
            }
        ],
        "name": "publish",
        "outputs": [
            {
                "name": "videoId",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "reward",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_fileId",
                "type": "uint256"
            },
            {
                "name": "_value",
                "type": "uint8"
            }
        ],
        "name": "setFilePermission",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_avatar",
                "type": "string"
            }
        ],
        "name": "setMyAvatar",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_nickname",
                "type": "string"
            },
            {
                "name": "_profile",
                "type": "string"
            },
            {
                "name": "_avatar",
                "type": "string"
            }
        ],
        "name": "setMyInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_nickname",
                "type": "string"
            }
        ],
        "name": "setMyNickname",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_profile",
                "type": "string"
            }
        ],
        "name": "setMyProfile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_cover",
                "type": "string"
            },
            {
                "name": "_videoinfo",
                "type": "string"
            }
        ],
        "name": "setVideo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_info",
                "type": "string"
            }
        ],
        "name": "setVideoInfo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_value",
                "type": "uint8"
            }
        ],
        "name": "setVideoPermission",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "name": "_albumvideoId",
                "type": "uint256"
            },
            {
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "updateAlbumVideo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "albumNum",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_albumId",
                "type": "uint256"
            }
        ],
        "name": "getAlbum",
        "outputs": [
            {
                "name": "title",
                "type": "string"
            },
            {
                "name": "cover",
                "type": "string"
            },
            {
                "name": "info",
                "type": "string"
            },
            {
                "name": "author",
                "type": "address"
            },
            {
                "name": "videonum",
                "type": "uint256"
            },
            {
                "name": "durationSum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "getAlbumVideo",
        "outputs": [
            {
                "name": "videoId",
                "type": "uint256"
            },
            {
                "name": "title",
                "type": "string"
            },
            {
                "name": "cover",
                "type": "string"
            },
            {
                "name": "videoinfo",
                "type": "string"
            },
            {
                "name": "info",
                "type": "string"
            },
            {
                "name": "duration",
                "type": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "name": "author",
                "type": "address"
            },
            {
                "name": "commentsNum",
                "type": "uint256"
            },
            {
                "name": "gratuityNum",
                "type": "uint256"
            },
            {
                "name": "gratuitySum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_gratuitysId",
                "type": "uint256"
            }
        ],
        "name": "getGratuitys",
        "outputs": [
            {
                "name": "author",
                "type": "address"
            },
            {
                "name": "gratuity",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_userAdd",
                "type": "address"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "name": "nickname",
                "type": "string"
            },
            {
                "name": "profile",
                "type": "string"
            },
            {
                "name": "avatar",
                "type": "string"
            },
            {
                "name": "videoNums",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "getVideo",
        "outputs": [
            {
                "name": "title",
                "type": "string"
            },
            {
                "name": "cover",
                "type": "string"
            },
            {
                "name": "videoinfo",
                "type": "string"
            },
            {
                "name": "info",
                "type": "string"
            },
            {
                "name": "duration",
                "type": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "name": "author",
                "type": "address"
            },
            {
                "name": "commentsNum",
                "type": "uint256"
            },
            {
                "name": "gratuityNum",
                "type": "uint256"
            },
            {
                "name": "gratuitySum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_commentId",
                "type": "uint256"
            }
        ],
        "name": "getVideoComment",
        "outputs": [
            {
                "name": "content",
                "type": "string"
            },
            {
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "name": "videotimestamp",
                "type": "uint256"
            },
            {
                "name": "author",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_fileId",
                "type": "uint256"
            }
        ],
        "name": "getVideoFile",
        "outputs": [
            {
                "name": "filename",
                "type": "string"
            },
            {
                "name": "fileinfo",
                "type": "string"
            },
            {
                "name": "size",
                "type": "uint256"
            },
            {
                "name": "width",
                "type": "uint32"
            },
            {
                "name": "height",
                "type": "uint32"
            },
            {
                "name": "fps",
                "type": "uint32"
            },
            {
                "name": "fileNum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "name": "_lableId",
                "type": "uint256"
            }
        ],
        "name": "getVideoLable",
        "outputs": [
            {
                "name": "lable",
                "type": "string"
            },
            {
                "name": "times",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "videoNum",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];