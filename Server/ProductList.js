const req = require("request"), cherio = require('cheerio'), axios = require("axios"), fs = require('fs'), findmainpage = require("./productpage");
// let FlipkartObj={};
// let AmazonObj={};

const filepath = '../Client/src/database.json';

let flipkartproducts = [];
let amazonproducts = [];
let z = 0;
let amz = 0;
let flip = 0;

function storefilpkart(listname, listLink, image, requirements) {
    // console.log("flipc   "+z++);
    for (let i = 0; i < requirements.length; i++) {
        if (!listname.includes(requirements[i]) && !requirements[i].includes("and")) {
            break;
        }

        if (i == requirements.length - 1) {
            // console.log(listname);

            //  if(listname.includes(requirements[i])){FlipkartObj[listname]=("https://www.flipkart.com"+listLink);  
            findmainpage.Flipkartdetials(("https://www.flipkart.com" + listLink), flip);
            flipkartproducts.push({
                id: ++flip,
                name: listname,
                link: ("https://www.flipkart.com" + listLink),
                image: image,
                detials: {
                    "detailName": "loading...",
                    "detailPrice": "Loading...",
                    "detailOffer": "Loading...",
                    "detailRating": "Loading..."
                }
            });

        }

    }
}
function findtheproductinflipkart(FlipkartLink, requirements) {
    console.log("flip  " + z++);

    req(FlipkartLink, (error, response, html) => {
        if (!error) {
            const $ = cherio.load(html);
            requirements = (($("._10Ermr").children('span').text()).toLowerCase().trim()).split(" ");
            $('._1AtVbE').each((i, val) => {
                let listname = "", listLink = "", image = "";
                if ($('div').hasClass('_2WkVRV')) {
                    listname = ($(val).find('._2WkVRV').text()).toLowerCase() + " " + ($(val).find('.IRpwTa').text()).toLowerCase();
                    listLink = $(val).find('.IRpwTa').attr('href')
                    image = $(val).find('._396cs4').attr('src')
                } else if ($('div').hasClass('_4rR01T')) {
                    listname = ($(val).find('._4rR01T').text()).toLowerCase()
                    listLink = $(val).find('._1fQZEK').attr('href')
                    image = $(val).find('._396cs4').attr('src')
                }
                else if ($('a').hasClass('s1Q9rs')) {
                    listname = ($(val).find('.s1Q9rs').text()).toLowerCase()
                    listLink = $(val).find('.s1Q9rs').attr('href')
                    image = $(val).find('._396cs4').attr('src')
                } else { console.log("Not Found") }
                if (image == undefined) {
                    image = $(val).find('._2r_T1I').attr('src')
                }
                storefilpkart(listname, listLink, image, requirements)
            })
        }
        storeinjson();
    });
}

function findtheproductinamazon(AmazonLink, requirements) {
    req({ url: AmazonLink, gzip: true }, (error, response, html) => {
        console.log("amz");
        console.log("amzon  " + z++);
        if (!error) {
            const $ = cherio.load(html);
            if ("" != $(".a-text-italic").text()) {
                requirements = $(".a-text-italic").text().toLowerCase().split(" ");
            }
            console.log(requirements);
            $(".s-card-container").each((i, val) => {
                const listname = $(val).find(".a-text-normal").text().toLowerCase();
                for (let i = 0; i < requirements.length; i++) {
                    if (!(($(val).find('.a-color-secondary').text()) == "Sponsored")) {
                        if (!listname.includes(requirements[i]) && i == requirements.length - 1) {
                            break;
                        }
                        if (i == (requirements.length - 1)) {
                            let n = listname.indexOf("₹");
                            if (listname.indexOf("₹") == -1) {
                                n = listname.length;
                            }
                            findmainpage.Amazondetials(("https://www.amazon.in/" + $(val).find('.a-text-normal').attr('href')), amz);
                            amazonproducts.push({
                                id: ++amz,
                                name: (listname).substring(0, n),
                                link: "https://www.amazon.in/" + ($(val).find('.a-text-normal').attr('href')),
                                image: $(val).find('.s-image').attr('src'),
                                detials: {
                                    "detailName": "loading...",
                                    "detailPrice": "Loading...",
                                    "detailOffer": "Loading...",
                                    "detailRating": "Loading..."
                                }
                            });
                        }
                    }
                }
            })
            storeinjson();
        } else {
            console.log("server is unreachable...");
            if (amz < 10) {
                findtheproductinamazon(AmazonLink, requirements)
            }
        }
    })

}

function storeinjson() {
    var json = {
        amazon: amazonproducts,
        flipkart: flipkartproducts
    }
    fs.writeFile(filepath, JSON.stringify(json, 10000, 5), err => {
        if (err) throw err;
        console.log('data written successfully on db.json...');
    });
}



module.exports = {
    make_API_call: function (productname) {
        flipkartproducts = [];
        amazonproducts = [];
        z = 0;
        amz = 0;
        flip = 0;
        let Name = productname.toLowerCase().trim();
        requirements = Name.split(" ");

        let fliplink = Name.replaceAll(" ", "%20%20");
        let FlipkartLink = "https://www.flipkart.com/search?q=" + fliplink + "&otracker=AS_Query_HistoryAutoSuggest_5_0&otracker1=AS_Query_HistoryAutoSuggest_5_0&marketplace=FLIPKART&as-show=on&as=off&as-pos=5&as-type=HISTORY";
        findtheproductinflipkart(FlipkartLink, requirements)

        let amlink = Name.replaceAll(" ", "+");
        let AmazonLink = "https://www.amazon.in/s?k=" + amlink
        findtheproductinamazon(AmazonLink, requirements)
    }
}


// testCases
// cable creation multiport adapter usb c
// asssssus vivoboook
// tp link ethernet adapter
// data warehousing and dATA MINING"
// object oriented development sysytem
// hp victus