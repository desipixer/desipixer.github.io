//service.util.js
app.service('service.auth', ["$q", function ($q) {

	// contains method for authentication
	var authKey = "AIzaSyAb3tFTPvsduIR2xopIVpYhwKMQ5ac_5Po";
	var clientSecret = "215192364453-1vbjuf6f3r0vka9b5q0hj2mqj212dr9o.apps.googleusercontent.com";

	var getAuthKey = function () {
		return authKey;
	}

	var deferred = $q.defer();

	var blogger = {
		getKey: function () {
			return authKey;
		},
		getClientSecret: function () {
			return clientSecret;
		},
		logMeIn: function () {
			var key = this.getKey();
			var parameters = {
				client_id: this.getClientSecret(),
				immediate: false,
				response_type: "token",
				scope: "http://www.blogger.com/feeds/"
			};
			gapi.auth.authorize(parameters, this.callbackFn);
		},
		callbackFn: function (data) {
			this.accessToken = data.access_token;
			deferred.resolve(data);
		},
		getToken: function () {
			this.logMeIn();
			return deferred.promise;
		},
		getAuthToken: function (data) {
			if (data != null) {
				return "Bearer ".concat(data.access_token);
			} else {
				return null;
			}
		},
		accessToken: null
	}

	var wordpressKeys = function () {
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
		return wpAuthArray;
	}

	var obseleteKeys = [{
			"k": "n75l%!FgW4QYGo(d)txM(vET*x)Vz&4#eOiA$&Bu2dESBF6SYJXA$a3LAmmD*6Fd",
			"id": "123529464",
			"url": "http://desipixer4all.wordpress.com"
		},
		{
			"k": "563pl9%SbhQxr!1cF*fBffoY(7uVLbnhqaD39EEd^qxLNBZ9@S$$2yH3(M4dHqH(",
			"id": "123532018",
			"url": "http://p4pixer.wordpress.com"
		},
		{
			"k": "3lfaVOM2Exp*7lHRzd1Itg2CsR6ZdgHYfe8qJAY#^jxA#)lV26jXBP^AKFJNG!8X",
			"id": "123584701",
			"url": "http://p1pixer.wordpress.com"
		},
		{
			"k": "KiaJ52r1&LYzcXv!IKw!r^z6*r&oR&KyA0SYs9aM%$Hu^gWed2PQP25z@Pzf#8@j",
			"id": "123589156",
			"url": "http://p2pixer.wordpress.com"
		},
		{
			"k": "ooqaYu5!1NAR@JKR0Nmh%EBDoOThmESBqYSuEPY2MtzY#ZzO$9rDJg9a@eeVk1Nk",
			"id": "123997120",
			"url": "http://p3pixer.wordpress.com"
		},
		{
			"k": "uz956XTL!N!dS5)&Ym^I@0kl#@&!bp!9ZjxjMd*Mjp!vnQPOi%HZyt#W9R!M!)2u",
			"id": "124016517",
			"url": "http://p5pixer.wordpress.com"
		},
		{
			"k": "nh(r%rMY&26F8l!&rP4^P0GhrK@0O^N(FG0TvmwA0fxcS529dUu(Xcgcc#CHdNZm",
			"id": "124210679",
			"url": "http://p6pixer.wordpress.com"
		},
		{
			"k": "wENBN7RDts1AaQC0HaItfwb3a5L1wu24aSrqIEptF3qmekJiCyLa*WGElnlvn3c&",
			"id": "124264068",
			"url": "http://p7pixer.wordpress.com"
		},
		{
			"k": "Q*0DCC!dk9j56U#ZK3GO2xmwB68o9GN1o1h!l(G2&)NJfXmO67mAww$PzaZlXTk#",
			"id": "124315189",
			"url": "http://p0pixer.wordpress.com"
		},
		{
			"k": "!ZTen(MhUi@H88AUTRgN$Flo%ihcp6UQKr5V!Z1c%CyL@ww0FT9Yv1EAgyx95Svq",
			"id": "125064500",
			"url": "http://p9pixer.wordpress.com"
		}, {
			"k": "An%QTst2!ZXhN5WmKSQpzlxtMY9Uz1QEA3l97DcBfvj9fOFkr@mUBXl)$eq!3l9P",
			"id": "125169089",
			"url": "http://p10pixer.wordpress.com"
		}, {
			"k": "AsaG&73bWRNm5%s2QT3PLEwRA34c#JRXVxImzZKOOWZ^*Q4WJAMXb3QpVS1%WoJn",
			"id": "125295464",
			"url": "http://p11pixer.wordpress.com"
		}, {
			"k": "#nszah*X1zG02RPdyQS$OJEtceD!jJXMiGCDLMhI2Zad1id^rmb)xy)nz)4&n3d@",
			"id": "125299869",
			"url": "http://p12pixer.wordpress.com"
		}, {
			"k": "g1Z1bdir()Tl5onXeMYEsPkb8YZkq)PrJFwnQi@#YCU2jvybU^ufeHAiZ#Sds7K)",
			"id": "125571041",
			"url": "http://p13pixer.wordpress.com"
		}, {
			"k": "AYaBUdCp13qm*KS0b&9P^^oxD7bBa#&&Ou^XO&v@Rz59MAEoE2ljjCKUA5Wqa!%K",
			"id": "126218198",
			"url": "http://p14pixer.wordpress.com"
		}, {
			"k": "BHHyD)L9cb9quM61KXAEK#VBxeUbXu)XM%pX7^rhxp(L(t73ct6hu4weDh$0sh3t",
			"id": "127036792",
			"url": "http://p15pixer.wordpress.com"
		}, {
			"k": "Etlc7ZGKV#)381Z(Gr3uWPnomKmte@L*rU6Cc)XIv9b9Kd2KF@a$FHrP^mFN5EV)",
			"id": "127756953",
			"url": "http://p16pixer.wordpress.com"
		}, {
			"k": "23o$b6P*o*QpfgXqVAkrF15IMpqRjO6CG8^fjZTHumuXsiCAJHs7hSEY7oT6$IP6",
			"id": "129364434",
			"url": "http://p18pixer.wordpress.com"
		},
		{
			"k": "K1nWTqM!3cwreJewYo^AS%jJQYfp6Ie4(uBF!1yuLryI6##X!mC%sNv2byU@a7!n",
			"id": "130089074",
			"url": "http://p19pixer.wordpress.com"
		},
		{
			"k": "oZ#6LbBE5syI3ycx19#(Mh5iRWKul%jb2G4MZ65*xtvKC9xIFQ6pH0itiFMNNJj6",
			"id": "130666870",
			"url": "http://p20pixer.wordpress.com"
		},
		{
			"k": "ZpV9Y3S8Zft8zY#Lp0zdNXHiW)%SluCfHwkBC#YXCCRktZdX#qeZtYgm*5RvS*AI",
			"id": "130966368",
			"url": "http://p22pixer.wordpress.com"
		},
		{
			"k": "KEvHN6S0uo4RWuw0bSGtx9ygXr9EhWQNaduLoiB4GmDu8duDSC5Vxco&2MDUG*3P",
			"id": "131240918",
			"url": "http://p23pixer.wordpress.com"
		},
		{
			"k": "TXDB#6WAb(doAIqEO0MZrGOYWoytBw6b&FsdS61*qjjN#xZLRh5#F)#lnEQqEw@%",
			"id": "131347544",
			"url": "http://p24pixer.wordpress.com"
		},
		{
			"k": "4&QK5F@zk96kDPO#Q^MiH2*WbY3gWGFDlksuPLbr0ikYrYBdACIbqqob4#mnn#CT",
			"id": "131368491",
			"url": "http://p25pixer.wordpress.com"
		},
		{
			"k": "GAplX8zm4#Y(IHxBsyfT7&P%1NCX2ZkkaXA2Ww9rKS4#F)CU%B9OY%we9%g&)V62",
			"id": "133609128",
			"url": "http://pixer02.wordpress.com"
		}, 
		{
			"k": "c9*cNX9nYX!LINRxHMAyaLD9R^6ecHXdUZ8oLxDSJfE%&8Qy0QtREg)0Jvb)jXv%",
			"id": "133630558",
			"url": "http://pixer02x.wordpress.com"
		}, 
		{
			"k": "&jB16!UZQ@zqdJL)G0M^%CRKuT!DsQeHhGM#MM&8Iodnl#$rChLDu%N8qvxQ3iOx",
			"id": "133630587",
			"url": "http://pixer02y.wordpress.com"
		}
	];

	//var wpBlodId = "109226478";
	//var wpBlogId = "121469346";
	//var wpBlogId = "123309558"; // desipixerz.wordpress.com --unused
	//var wpBlogId = "123360170"; //desipixercelebsnext.wordpress.com
	//var wpBlogId = "123467412"; //desipixersblog.wordpress.com

	return {
		getAuthKey: getAuthKey,
		blogger: blogger,
		wpKeys: wordpressKeys
	}
}]);