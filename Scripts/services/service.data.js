app.service('service.data', function () {
    // all information / data should reside here.

    //data for blogs
    let blogsiteList = [
        {
            "blogId": "7833828309523986982",
            "blogURL": "http://www.desipixer.blogspot.com/",
            "category": 1
        },
        {blogId: "5594796922719072874", blogURL: "https://www.telugucelebs.com", category: 1},
        {blogId: "6382633314598071891", blogURL: "https://www.firstshowz.com/", category: 1},
        {blogId: "9038545936593609994", blogURL: "https://www.filmnstars.com/", category: 1},
        {blogId: "3164456237158089729", blogURL: "https://www.addatoday.com", category: 2},
        {blogId: "726426979120525537", blogURL: "https://actressdoodles.blogspot.com", category: 1},
        {
            "blogId": "3079987222818050451",
            "blogURL": "http://movies.cinema65.com/",
            "category": 1
        },
        {
            "blogId": "4846859112009281783",
            "blogURL": "http://rockingfunimages.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "3430584311590741572",
            "blogURL": "http://tollywoodboost.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4759663320355493354",
            "blogURL": "http://www.ciniwood.com/",
            "category": 1
        },
        {
            "blogId": "7259490184027416168",
            "blogURL": "http://www.bullet9.in/",
            "category": 1
        },
        {
            "blogId": "5961536704372440322",
            "blogURL": "http://actressphotoshootworld.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1722427737859638493",
            "blogURL": "https://mastimoviesz.blogspot.com",
            "category": 1
        },
        {
            "blogId": "7295395999065760083",
            "blogURL": "http://www.mirchitoday.com/",
            "category": 1
        },
        {
            "blogId": "4952007432472224346",
            "blogURL": "http://gkphotoes.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1973587200631535140",
            "blogURL": "https://www.allcinemanews.com",
            "category": 1
        },
        {
            "blogId": "577611548061517157",
            "blogURL": "http://actresscelebrities.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6693996329548407390",
            "blogURL": "http://www.marathifilmnagar.com",
            "category": 1
        },
        {
            "blogId": "6405066402994653241",
            "blogURL": "https://expensivestars.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "3190717212472334030",
            "blogURL": "http://www.stunningactress.com",
            "category": 1
        },
        {
            "blogId": "8176786623048835025",
            "blogURL": "http://bollywood-replica-saree.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "719302156971941098",
            "blogURL": "http://hq-bollywood.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1579799827781024268",
            "blogURL": "http://www.telugupeopleadda.com/",
            "category": 1
        },
        {
            "blogId": "5935905342569794143",
            "blogURL": "http://sabhothimages.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "801637413886327659",
            "blogURL": "http://honeymedia.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "530660620295703790",
            "blogURL": "http://wallpaperhd6.blogspot.in/",
            "category": 1
        },
        {
            "blogId": "6468018902177861697",
            "blogURL": "http://totaltollywoodmovies.blogspot.com/",
            "category": 2
        },
        {
            "blogId": "7225871578344472338",
            "blogURL": "http://www.urtamilcinema.com/",
            "category": 2
        },
        {
            "blogId": "4846859112009281783",
            "blogURL": "http://www.celebsnext.com/",
            "category": 2
        },
        {
            "blogId": "3568736907693451574",
            "blogURL": "http://filmytrend.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2951969169923408846",
            "blogURL": "http://fultohot.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7294698807437562935",
            "blogURL": "http://tollywoodtolly.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7521091312921738775",
            "blogURL": "http://cinehike.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4985646326158465936",
            "blogURL": "http://www.tollywoodblog.in/",
            "category": 2
        },
        {
            "blogId": "7468784626602203128",
            "blogURL": "http://telugu.zustcinema.com/",
            "category": 2
        },
        {
            "blogId": "5656041982218593755",
            "blogURL": "http://filmgain.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7874248432678435813",
            "blogURL": "http://www.c65.in/",
            "category": 2
        },
        {
            "blogId": "5338625676592862668",
            "blogURL": "http://cinytown.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2222622162581355396",
            "blogURL": "http://www.tufan9.com/",
            "category": 1
        },
        {
            "blogId": "5945193835116701787",
            "blogURL": "https://aardemasti.blogspot.com",
            "category": 2
        },
        {
            "blogId": "5186853171678363994",
            "blogURL": "https://latestmovieimagess.blogspot.com",
            "category": 1
        },
        {
            "blogId": "3835582922244616101",
            "blogURL": "http://filmeeclub.blogspot.in/",
            "category": 1
        },
        {
            "blogId": "3512841850294928870",
            "blogURL": "http://bollywoodtadkamasala.blogspot.com",
            "category": 2
        },
        {
            "blogId": "8136369645221096595",
            "blogURL": "http://bollywoodmirchitadka.blogspot.com",
            "category": 1
        },
        {
            "blogId": "5023340210550464138",
            "blogURL": "http://www.manahungama.com/",
            "category": 1
        },
        {
            "blogId": "8286550106938870562",
            "blogURL": "https://trisha-pix.blogspot.com",
            "category": 1
        },
        {
            "blogId": "8014469095416202791",
            "blogURL": "https://anu-emmanuel.blogspot.com",
            "category": 1
        },
        {
            "blogId": "175938421274342604",
            "blogURL": "https://shraddha-kapoor-photos.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8415970476188871245",
            "blogURL": "https://bikini-bolly.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "148589868162243740",
            "blogURL": "https://dishapatani-pix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7345164977335901912",
            "blogURL": "https://bolly-glam.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7768880182878796665",
            "blogURL": "https://cute-goddess.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2579625611323391584",
            "blogURL": "https://cute-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6853274516672689018",
            "blogURL": "https://glam-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7420263674707529141",
            "blogURL": "https://hq-tollywood.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7646450543978764525",
            "blogURL": "https://desipixer-all.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "873009466583458846",
            "blogURL": "https://idlepix.blogspot.com/",
            "category": 1
        }
    ];

    let postBlogsiteList = [
        {
            "blogId": "7833828309523986982",
            "blogURL": "http://www.desipixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "5935768727601291895",
            "blogURL": "http://pixerdesi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4938539013570546208",
            "blogURL": "http://tamilpicz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2313063316259818401",
            "blogURL": "http://cinestillz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1689491623003449378",
            "blogURL": "http://pixerhub.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2360413207505978741",
            "blogURL": "http://pixerblog.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7527460989335381985",
            "blogURL": "http://pixerone.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8288428012409826912",
            "blogURL": "http://samanthapix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "4729247519531040631",
            "blogURL": "http://rakulpixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6614264041233815321",
            "blogURL": "http://kajalpixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2016762340977866228",
            "blogURL": "http://shriyapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "9026317655696914243",
            "blogURL": "http://samanthapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7770041580109253182",
            "blogURL": "http://tamannapixer.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6586894154019969761",
            "blogURL": "http://desipixerz.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2727757258846553498",
            "blogURL": "https://pixer-master.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "260546303850303554",
            "blogURL": "https://mehreen-pirzada.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8286550106938870562",
            "blogURL": "https://trisha-pix.blogspot.com",
            "category": 1
        },
        {
            "blogId": "8014469095416202791",
            "blogURL": "https://anu-emmanuel.blogspot.com",
            "category": 1
        },
        {
            "blogId": "175938421274342604",
            "blogURL": "https://shraddha-kapoor-photos.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8415970476188871245",
            "blogURL": "https://bikini-bolly.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "148589868162243740",
            "blogURL": "https://dishapatani-pix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7345164977335901912",
            "blogURL": "https://bolly-glam.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7768880182878796665",
            "blogURL": "https://cute-goddess.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2579625611323391584",
            "blogURL": "https://cute-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "6853274516672689018",
            "blogURL": "https://glam-desi.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7420263674707529141",
            "blogURL": "https://hq-tollywood.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "7646450543978764525",
            "blogURL": "https://desipixer-all.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "3119958128609957983",
            "blogURL": "https://desi-saree.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "873009466583458846",
            "blogURL": "https://idlepix.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "2578217001206641559",
            "blogURL": "https://desipixer02.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "1585528825343121306",
            "blogURL": "https://desipixer03.blogspot.com/",
            "category": 1
        },
        {
            "blogId": "8460581893105899988",
            "blogURL": "https://desipixer04.blogspot.com/",
            "category": 1
        },
        {blogId: "3744279159256825106", blogURL: "https://saree-pixer.blogspot.com/", category: 1},
        {blogId: "3375188900476523711", blogURL: "https://hornydesiactress.blogspot.com/", category: 1},
        {blogId: "3608341200992134490", blogURL: "https://desipiza.blogspot.com/", category: 1},
        {blogId: "2323645530443654738", blogURL: "https://navelshowz.blogspot.com/", category: 1}
    ];




    return {
        blogsiteList: blogsiteList,
        postBlogsiteList: postBlogsiteList
    }
});