const axios = require("axios"), cherio = require('cheerio'), req = require("request"), fs = require("fs");
const filepath = '../Client/src/database.json';
val = {};
specobj = {};
speck = [];
aboutarr = []
filpval = {};
flipspecobj = {};
let databases;
// function  aboutFilter(about){
//     temp=about.split("    ");
//     for (let i = 0; i < temp.length; i++) {
//         if(temp[i].length>10){ 
//             aboutarr.push(temp[i])
//         }
//     }
// }
function flipkartSpecificationFliter(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        flipspecobj[arr1[i]] = arr2[i];
    }
}
function amazonSpecificationFilter(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        specobj[arr1[i]] = arr2[i];
    }

    // specif=specif.substring(specif.indexOf("Brand"));
    // specif=specif.substring(0,specif.indexOf("\n"));
    // arr=specif.split("     ");
    // for (let index = 0; index < arr.length; index++) {
    //     if((arr[index].length)>1){
    //         speck.push(arr[index]);
    //     }
    // }
    // for (let index = 0; index < speck.length; index+=2) {
    //    obj[speck[index]]=speck[index+1];
    // }
    // console.log(obj);
}

function initamazon(producturl) {
    return new Promise((res, re) => {
        req({ url: producturl, gzip: true }, (error, response, html) => {
            // console.log(producturl);
            if (!error) {
                console.log("Ast");
                const $ = cherio.load(html);
                product = $("#productTitle").text().trim();
                spec = (product.substring(product.indexOf("(")));
                if (product.indexOf("(") > -1) {
                    if (product.substring(0, product.indexOf("(")) != "") {
                        product = product.substring(0, product.indexOf("("));
                    };
                }
                // if(!($("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole").text())){
                //     price=($("#corePrice_desktop > div > table > tbody > tr:nth-child(2) > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span.a-offscreen").text());
                //         if(price==""){
                //             price=($("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").text())
                //         }
                // }
                //  else{
                //     price=($("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole").text());
                // }
                price = $('#corePrice_desktop > div > table > tbody > tr:nth-child(2) > td.a-span12 > span.a-price.a-text-price.a-size-medium.apexPriceToPay > span:nth-child(2)').text();
                if (price.length == 0) {
                    price = '₹'+$('#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole').text();

                    if (price.length <= 1) {
                        price = $("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole").text();
                        if (price.length <= 1) {
                            price = "Not Mentioned";
                        }
                    }
                }
                let star = $('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4-5 > span').text() + ' Rated by ' + $('#acrCustomerReviewText').text() + ' People';
                if ($('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4-5 > span').text().length == 0) {
                    star = $('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4 > span').text() + ' Rated by ' + $('#acrCustomerReviewText').text() + ' People';
                    if ($('#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star.a-star-4 > span').text().length == 0) {
                        star = "0 ratings";
                    }
                }

                let rated = $("#acrCustomerReviewText").text().substring(0, ($("#acrCustomerReviewText").text()).indexOf("s") + 1);

                let offerpercentage = ($("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-size-large.a-color-price.savingPriceOverride.aok-align-center.reinventPriceSavingsPercentageMargin.savingsPercentage").text());
                offerpercentage = offerpercentage.substring(1, offerpercentage.length)
                if (offerpercentage == "") {
                    offerpercentage = "0%"
                }
                if (rated == "") {
                    rated = "0 customers rated.."
                }
                let emioption = ($("#inemi_feature_div > span:nth-child(1)").text());
                if (emioption == "") {
                    emioption = "emi option unavailable"
                }

                //  console.log(price);
                //  if(price=""){
                //     price="Not Mentioned";
                //  }
                //  else{
                //     price="₹"+price;
                //  }

                //  about=($("#feature-bullets")).text().trim();
                //  aboutFilter(about)
                // if(price.length==""){
                //     console.log("reacll...");
                //     console.log(producturl);
                //     // await initamazon(producturl);
                // }
                val = {
                    detailName: product,
                    detailPrice: price,
                    detailSpecification: spec,
                    detailRating: star.substring(0, 17),
                    detailCustomerRated: rated,
                    detailOffer: offerpercentage,
                    detailEmi: emioption,
                    detailDeliveryChrage: ($("#FREE_DELIVERY > div.a-section.a-spacing-none.icon-content > a").text().trim()),
                    detialReplacement: ($("#RETURNS_POLICY > span > div.a-section.a-spacing-none.icon-content > a").text()),
                    DetialSpec: specobj
                }
                // console.log(val);
            }
            res()
        })
    })
}
function updateAmazonJson(id) {
    const data = fs.readFileSync(filepath, 'utf8')
    databases = JSON.parse(data)
    // console.log(id);
    // console.log(val);
    // val = Object.assign(databases.amazon[id].detials, val)
    databases.amazon[id].detials = val;
    fs.writeFileSync(filepath, JSON.stringify(databases, null, 5));
    // console.log(idcount);
    // if((databases.amazon).length==idcount){
    //     process.exit()
    // }
    // idcount++;
    // console.log(databases);
}

function updateflipkartJson(id) {
    const data = fs.readFileSync(filepath, 'utf8')
    databases = JSON.parse(data)
    // val = Object.assign(databases.flipkart[id].detials, val)
    // console.log(id);
    // console.log(flipval);
    databases.flipkart[id].detials = flipval;
    fs.writeFileSync(filepath, JSON.stringify(databases, null, 5));

}

function initflipkart(producturl) {
    return new Promise((res, re) => {
        console.log("Fst");
        req(producturl, (error, response, html) => {
            if (!error) {
                const $ = cherio.load(html);
                var string = $(".B_NuCI").text().trim();
                var indexbracket = string.indexOf('(') - 1;
                var productName = (string.substring(0, indexbracket));
                if (!productName) {
                    productName = $(".B_NuCI").text().trim()
                }
                var spec = (string.substring(string.indexOf("(")));
                var price = ($("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d").text());
                var ratting = ($('._3LWZlK').text().substring(0, 3) + " out of 5 stars");
                var custrated = ($("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div:nth-child(2) > div > div > span._2_R_DZ > span > span:nth-child(1)").text() + "found...!");

                let offerpercentage = $("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._3Ay6Sb._31Dcoz > span").text();

                if (offerpercentage == "") {
                    offerpercentage = "0%";
                }
                if (price == "") {
                    price = $("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(3) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d").text();
                    if (price == "") {
                        price = "Not Mentioned"
                    }
                }
                if (ratting.length == 15) {
                    ratting = " 0 " + ratting
                }
                if (custrated.length == 9) {
                    custrated = "no ratings founded.."
                }
                flipval = {
                    detailName: productName,
                    detailPrice: price,
                    detailSpecification: spec,
                    detailRating: ratting,
                    detailCustomerRated: custrated,
                    detailOffer: offerpercentage,
                    detailEmi: "Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500*",
                    detailDeliveryChrage: "based on location",
                    detialReplacement: $("._2MJMLX").text(),
                    DetialSpec: flipspecobj
                }
                res();
            }
        })
    })
}

module.exports = {
    Amazondetials: async function (producturl, id) {
        await initamazon(producturl);
        updateAmazonJson(id);
    },
    Flipkartdetials: async function (producturl, id) {
        await initflipkart(producturl);
        updateflipkartJson(id);
    },
    // Amazondetials:(producturl)=>{
    //     init(producturl).then(console.log(val))
    // },
    // makeobj: function (){
    //     return status
    // }
};
// let status=false;
// const amlin="https://www.amazon.in/Redmi-inches-Smart-L43M6-RA-Android/dp/B09G73T643/ref=sr_1_2_sspa?keywords=mi+tv&qid=1668266401&qu=eyJxc2MiOiI0LjcyIiwicXNhIjoiNC4zOCIsInFzcCI6IjMuNjMifQ%3D%3D&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1";
// const fliplin="https://www.flipkart.com/mi-4a-horizon-100-cm-40-inch-full-hd-led-smart-android-tv-20w-powerful-audio-bezel-less-frame/p/itm3c92e3fcfdeca?pid=TVSG36HHUKPKGJFC&lid=LSTTVSG36HHUKPKGJFCES4MSK&marketplace=FLIPKART&q=Mi%20tv%204a&store=ckf%2Fczl&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=1f8487a0-04b7-4109-a356-7cc2d311d196.TVSG36HHUKPKGJFC.SEARCH&ppt=sp&ppn=sp&ssid=0az5zwxvk00000001663344698985&qH=04e81d700cbf8360";
// Flipkartdetials(fliplin);
// Amazondetials(amlin)
// process.on('exit', () => {
//     Whatisthestatus()
// })
// function Whatisthestatus(){
//     console.log("exit....");
//     content="restart";
//     fs.writeFile('F://webScrapingProject//server//restart.txt', content, err => {
//         if (err) {
//           console.error(err);
//         }
//         // file written successfully
//       });
//     status=true
// }
