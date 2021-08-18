var t = require("../../utils/serve.js"), o = (require("../../utils/util.js"), void 0), e = void 0;

Page({
    data: {
        location: "武汉市",
        now: {},
        nowAir: {},
        hourly: [],
        hourlyWeather: [],
        icon: "",
        isShowLoading: !1
    },
    onTapDayWeather: function () {
        wx.navigateTo({
            url: "/pages/list/list?location=" + e + "," + o
        });
    },
    Weather: function (o, e) {
        var n = this, i = {
            location: location ? e + "," + o : "101010100",
            key: "此处填写自己的和风天气api的key"
        };
        t._get("https://devapi.heweather.net/v7/weather/now?", i, function (t) {
            var o = t.data.now;
            n.setData({
                now: o
            });
        }, function (t) { }, function (t) {
            wx.stopPullDownRefresh();
        }), t._get("https://devapi.heweather.net/v7/air/now?", i, function (t) {
            var o = t.data.now;
            n.setData({
                nowAir: o
            });
        }, function (t) { }, function () { }), t._get("https://devapi.heweather.net/v7/weather/24h?", i, function (t) {
            var o = t.data.hourly;
            n.setData({
                hourly: o
            }), n.setHourlyWeather();
        }, function (t) { }, function () { });
    },
    setHourlyWeather: function () {
        for (var t = new Date().getHours(), o = [], e = 0; e < 24; e += 1) o.push({
            time: (e + t) % 24 + "时",
            text: this.data.hourly[e].text,
            temp: this.data.hourly[e].temp + "°",
            icon: this.data.hourly[e].icon
        });
        o[0].time = "现在", this.setData({
            hourlyWeather: o
        });
    },
    genCodeLocation: function (o, e) {
        var n = this, i = {
            location: o + "," + e,
            key: "此处填写自己腾讯地图api的key"
        };
        t._get("https://apis.map.qq.com/ws/geocoder/v1/?", i, function (t) {
            n.setData({
                location: t.data.result.address_component.district + t.data.result.address_reference.town.title
            });
        }, function (t) { }, function () {
            n.Weather(o, e);
        });
    },
    getLocationAction: function () {
        var t = this;
        wx.getLocation({
            success: function (n) {
                o = n.latitude, e = n.longitude, t.genCodeLocation(o, e);
            },
            fail: function () {
                t.Weather("", "");
            }
        });
    },
    onTapChooseLocation: function () {
        var t = void 0, n = this;
        wx.getSetting({
            success: function (i) {
                (t = i.authSetting["scope.userLocation"]) ? wx.chooseLocation({
                    success: function (t) {
                        n.setData({
                            location: t.address
                        }), o = t.latitude, e = t.longitude, location = t.latitude + "," + t.longitude,
                            n.Weather(t.latitude, t.longitude);
                    },
                    fail: function () { }
                }) : (wx.showToast({
                    title: "检测到您没有开启位置权限，请先开启哦",
                    icon: "none",
                    duration: 3e3,
                    mask: !1
                }), setTimeout(function () {
                    wx.openSetting({
                        success: function (o) {
                            t = o.authSetting["scope.userLocation"], n.getLocationAction();
                        }
                    });
                }, 3e3));
            },
            fail: function () { },
            complete: function () { }
        });
    },
    onLoad: function (t) {
        this.getLocationAction();
    },
    onReady: function () { },
    onShow: function () { },
    onHide: function () { },
    onUnload: function () { },
    onPullDownRefresh: function () {
        this.Weather(o, e);
    },
    onReachBottom: function () { },
    onShareAppMessage: function () {
        return {
            title: "天色天气",
            path: "/pages/index/index"
        };
    }
});
