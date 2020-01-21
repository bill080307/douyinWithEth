const DikTok_Abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_lableID",
                "type": "uint256"
            }
        ],
        "name": "addLable",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "albumNum",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_videotimestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_comment",
                "type": "string"
            }
        ],
        "name": "changeCommen",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_album",
                "type": "string"
            }
        ],
        "name": "createAlbum",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "albumnum",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "createAlbumVideo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "videonum",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_album",
                "type": "string"
            }
        ],
        "name": "editAlbum",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_albumId",
                "type": "uint256"
            }
        ],
        "name": "getAlbum",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "videonum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "durationSum",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "getAlbumVideo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "videoId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "videoHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "commentsNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vlableNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuityNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuitySum",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_gratuitysId",
                "type": "uint256"
            }
        ],
        "name": "getGratuitys",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "gratuity",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_lableID",
                "type": "uint256"
            }
        ],
        "name": "getLables",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLanguage",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAdd",
                "type": "address"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "userHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "userVideoNums",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userAlbumNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userGratuityCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userGratuitySum",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAdd",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_userVideoId",
                "type": "uint256"
            }
        ],
        "name": "getUserVideo",
        "outputs": [
            {
                "internalType": "string",
                "name": "videoHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "commentsNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vlableNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuityNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuitySum",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "getVideo",
        "outputs": [
            {
                "internalType": "string",
                "name": "videoHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "commentsNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vlableNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuityNum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "gratuitySum",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_commentId",
                "type": "uint256"
            }
        ],
        "name": "getVideoComment",
        "outputs": [
            {
                "internalType": "string",
                "name": "contentHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "videotimestamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_lableId",
                "type": "uint256"
            }
        ],
        "name": "getVideoLable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "lableID",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lableNum",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_videotimestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_comment",
                "type": "string"
            }
        ],
        "name": "makeComment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_lable",
                "type": "string"
            }
        ],
        "name": "newLables",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_video",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "_languageID",
                "type": "uint16"
            }
        ],
        "name": "publish",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "videoId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "reward",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_lableID",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_lable",
                "type": "string"
            }
        ],
        "name": "setLables",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_language",
                "type": "string"
            }
        ],
        "name": "setLanguage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_profile",
                "type": "string"
            }
        ],
        "name": "setMyProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_video",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            },
            {
                "internalType": "uint16",
                "name": "_languageID",
                "type": "uint16"
            }
        ],
        "name": "setVideo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "_value",
                "type": "uint8"
            }
        ],
        "name": "setVideoPermission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_albumId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_albumvideoId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_videoId",
                "type": "uint256"
            }
        ],
        "name": "updateAlbumVideo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "videoNum",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];