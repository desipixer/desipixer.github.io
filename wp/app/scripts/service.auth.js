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

        var deprecatedAuthKeys = [
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
            },
            {
                "k": "ypL&QSH55A62uZZ6@7nKW*wu749u%mLtGuPzkh0OQ*AHhPz5wWa002AY8Rwx%DqR",
                "id": "138037193",
                "url": "http://p12bo.wordpress.com"
            },
            {
                "k": "*0DS4X*ClJRBixEB!u6DK1P$SzcLqgVmUiUWg9dw0R8isA(oZyZyMo0a4zeVuO!r",
                "id": "138037214",
                "url": "http://p12to.wordpress.com"
            },
            {
                "k": "npokL2klx5DicZyV(Du!kbiWv4^ThbCHt*sC19BQzZPSARRpXx9I1r7)S9DpFRiI",
                "id": "138037237",
                "url": "http://p12ko.wordpress.com"
            },
            {
                "k": "QJnMng^wq*efCjT^Fii$nueZ63a0rerX6cdOCdX(GS5u^D(I5o1XMh%OwfO&HP^7",
                "id": "138056996",
                "url": "http://p12kw.wordpress.com"
            }
        ];

        
        var getWpAuth = {
            "k": "mP!Xczt#suEBlT$KfPY2kWLIa$$jaC6Tx11u8c*fEb3L4NXS6jHzrU00qiYLWvSV",
            "id": "137728983",
            "url": "http://pixer12wp.wordpress.com"
        }

        //Supporting multiple sites.
        var wpAuthArray = [
            {
                "k": "LUmz^F8FQ5t$)QakmeatMsjQmSS@&Lbak^CdpDtrgt027@GISvb00lka%ra%L$)T",
                "id": "138179701",
                "url": "http://p99x.wordpress.com"
            },
            {
                "k": "HUVLCuoAfl6EOoroyB3Vp$d7lml3*lO(dC*o*gpHuJ4eLYbq$WfxFEdk797PwIdq",
                "id": "138179732",
                "url": "http://p99y.wordpress.com"
            },
            {
                "k": "o0gahP1RMB#@aN^1RZYus$e@YBLg#z8RLi33)hBAdZ7C54HfEKBZSYkry6GyV7Fw",
                "id": "138179750",
                "url": "http://p99z.wordpress.com"
            },
            {
                "k": "8e635omQ5%#vn8yKpql#X!V(ge3pJDIT(IfTkJj@Z)@PXYq2ZY*qMvykMvdmPQHe",
                "id": "138217262",
                "url": "http://p99a.wordpress.com"
            },
            {
                "k": "NDZQWcrySkvMjeUfY@o^0$1eP7L#OT)cSl^MqX6JcyePg539XZ!r0xilay2iE8fD",
                "id": "138217282",
                "url": "http://p99c.wordpress.com"
            },
            {
                "k": "&CSG6B0fvP9t8RX0OzBAW$zG3VxH#74k!vxx%y@5u^4o3eL8Zsz$fmM8kjJIGKuM",
                "id": "138217317",
                "url": "http://p99d.wordpress.com"
            }
        ];

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