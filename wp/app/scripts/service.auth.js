app.service('service.auth', function () {

    /**
     * return k value for the site.
     */
    var AuthUtil = (function () {
        var k = Object.freeze({
            "k": "AIzaSyBZvR46qyUilZ6Fl5vn9oPnLZtYHnqSknE"
        });
        var getKey = function () {
            return k.k;
        };

        return {
            getKey: getKey
        }
    })();

    var WpAuth = (function(){
        
        var getWpAuth = {
            "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
            "id": "137728983",
            "url": "http://pixer12wp.wordpress.com"
        }

        //Supporting multiple sites.
        var wpAuthArray = [
            {
                "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
                "id": "137728983",
                "url": "http://pixer12wp.wordpress.com"
            },
            {
                "k": "FnXT0hE(UHL^3QRr0YZjnJMQ(efcBNPp3Ibx8xcnZwCUzUYm8h3q(z71UreEyBWz",
                "id": "137785059",
                "url": "http://p12x.wordpress.com"
            },
            {
                "k": "HjaXFCYITC!!770sJyFH5W6cXM8A0$zfV&018k57@SsGsQCUXNWL@rnoB#uxUo$V",
                "id": "137858077",
                "url": "http://p12y.wordpress.com"
            },
            {
                "k": "yTZEmEEGLxA6Rw$3vbZ)sI5zr1SmRLV2#*KIafBLuDbdGY!4yeQcGt0$rFPUdS!G",
                "id": "137858138",
                "url": "http://p12zblog.wordpress.com"
            },
            {
                "k": "!wkjCPw0w$Jawnf^XnXaYNWd&)cO^iA9mmIV&YZN2ctUUGvXLU)SaCQW47QEkw4@",
                "id": "137895800",
                "url": "http://p12go.wordpress.com"
            },
            {
                "k": "9N^dD319d1VdBn1GUE3!wDWeyMr8HwoDLdIz^qs8SFH31uyn3dqsFZceosnGuZ)T",
                "id": "137895882",
                "url": "http://p12in.wordpress.com"
            },
            {
                "k": "VkXQ%I2h2RxDkIcva5zE@tO@khPwW7pg%rza9(KPza8DhbX@%s^sPBG#bbh6hF)R",
                "id": "137947561",
                "url": "http://p12o.wordpress.com"
            },
            {
                "k": "KQsy8ZwOzcAUSP8(^!#cTC7vk&rttRbGRl6kL0Oh1H0!WJWTT42(MbFQOJ!^7sYo",
                "id": "137947612",
                "url": "http://p12q.wordpress.com"
            },
            {
                "k": "g4%cJAyHuaq@b^Nq6nA#d40C53Hl@TT^*56BG2O1TE3cUY&jM#l05SGQeLse6uP)",
                "id": "137947675",
                "url": "http://p12dp.wordpress.com"
            }
        ]

        return {
            getWpAuth : getWpAuth,
            wpAuthArray : wpAuthArray
        }
    })();
    
    return {
        getKey: AuthUtil.getKey,
        getWpAuth : WpAuth.getWpAuth,
        wpAuthArray : WpAuth.wpAuthArray
    }
})