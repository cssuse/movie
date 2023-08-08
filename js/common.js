(function () {
    indexApps = new Vue({
        el: "#app",
        data: {
            activeFlag: 0,
            rangeValue: 280,
            defaultImg: './images/movie.png',
            urlParams: {},
            list: [
                // {
                //     id: 4,
                //     img: '',
                //     url: './media/阳光电影www.ygdy8.com.重启地球.2021.HD.1080P.国语中字.mp4',
                //     title: '阳光电影www.ygdy8.com.重启地球.2021.HD.1080P.国语中字.mp4',
                //     desc: '阳光电影www.ygdy8.com.重启地球.2021.HD.1080P.国语中字.mp4',
                // },
                // {
                //     id: 3,
                //     img: '',
                //     url: './media/阳光电影www.ygdy8.com.冥界警局2：咒灵崛起.2022.BD.1080P.中英双字.mkv',
                //     title: '冥界警局2：咒灵崛起.2022.BD.1080P.中英双字.mkv',
                //     desc: '冥界警局2：咒灵崛起.2022.BD.1080P.中英双字.mkv',
                // },
                // {
                //     id: 2,
                //     img: '',
                //     url: './media/ckin.mp4',
                //     title: '动漫1',
                //     desc: '闹钟动漫',
                // },
                {
                    id: 1,
                    img: '',
                    url: './media/videoplayback.mp4',
                    title: '动漫',
                    desc: '闹钟动漫',
                },
            ],
            detailObj: {},
            movieName: '',
        },
        created: function () {
            console.log(111)

        },
        mounted() {
            console.log(window.location.href, window.location.href.indexOf('play.html'))
            let url = window.location.href
            if (url.indexOf('play.html') > -1) {
                console.log(this.getUrlParams(url))
                this.urlParams = this.getUrlParams(url) || {}
                if(this.urlParams.id == '0') {
                    if (this.urlParams.name.indexOf('http') > -1) {
                        this.detailObj.url = decodeURI(this.urlParams.name)
                    } else {
                        this.detailObj.title = decodeURI(this.urlParams.name)
                        this.detailObj.url = './media/' + decodeURI(this.urlParams.name)
                    }
                    
                    this.initPlayer()
                } else if (this.urlParams.id && this.urlParams.id !='0') {
                    this.detailObj = this.list.filter(item => item.id == this.urlParams.id)[0]
                    console.log(this.detailObj, 'this.detailObj')
                    this.initPlayer()
                }
                
            }

        },
        methods: {
            customInputFn() {
                
            },
            tabClick(flag) {
                this.activeFlag = flag
            },
            changeRange(val) {
                document.documentElement.style.setProperty("--minRangeValue", `${this.rangeValue}px`);
            },
            initPlayer() {
                let playerConfig = {
                    container: '#mui-player',
                    title: this.detailObj.title,
                    src: this.detailObj.url,
                    poster: this.detailObj.img || this.defaultImg,
                    height: '500px',
                    videoAttribute: [{
                            attrKey: 'webkit-playsinline',
                            attrValue: ''
                        },
                        {
                            attrKey: 'playsinline',
                            attrValue: ''
                        },
                        {
                            attrKey: 'x5-playsinline',
                            attrValue: ''
                        },
                        {
                            attrKey: 't7-video-player-type',
                            attrValue: 'inline'
                        },
                        {
                            attrKey: 'x5-video-player-type',
                            attrValue: 'h5-page'
                        },
                        {
                            attrKey: 'x-webkit-airplay',
                            attrValue: 'allow'
                        },
                        {
                            attrKey: 'controlslist',
                            attrValue: 'nodownload'
                        },
                    ]
                }
                playerConfig.plugins = [
                    typeof MuiPlayerDesktopPlugin == 'function' ? new MuiPlayerDesktopPlugin({
                        thumbnails: { // 缩略图配置
                            preview: ['./media/dm.png'],
                            tile: [10, 10],
                            scale: [160, 90],
                        },
                    }) : {},
                ]

                console.log(playerConfig);
                let mp = new MuiPlayer(playerConfig);
                console.log(mp)
            },
            getUrlParams(url) {
                // 通过 ? 分割获取后面的参数字符串
                let urlStr = url.split('?')[1]
                // 创建空对象存储参数
                let obj = {};
                // 再通过 & 将每一个参数单独分割出来
                let paramsArr = urlStr.split('&')
                for (let i = 0, len = paramsArr.length; i < len; i++) {
                    // 再通过 = 将每一个参数分割为 key:value 的形式
                    let arr = paramsArr[i].split('=')
                    obj[arr[0]] = arr[1];
                }
                return obj
            },
        },
        filters: {

        },
        beforeDestroy: function () {

        },
    })
})()
