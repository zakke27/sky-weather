module.exports = {
    _get: function(e, t, n, o, s) {
        wx.request({
            url: e,
            data: t,
            header: {
                "content-type": "application/json"
            },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: function(e) {
                n(e);
            },
            fail: function(e) {
                o(e);
            },
            complete: function() {
                s();
            }
        });
    }
};