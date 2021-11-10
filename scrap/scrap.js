"use strict"
const {
    chromium
} = require('playwright');


const searchToUrl = (search) => {
    search = search.replaceAll(" ", "-")
    return `https://computacion.mercadolibre.com.ar/${search}`;
}


module.exports = async (search) => {
    const items = [];
    const url = searchToUrl(search);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    for (let i = 1; i < 10; i++) {
        await page.locator('.ui-search-result-image__element').nth(i).click();
        Promise.allSettled([
                await page.locator('.ui-pdp-title').textContent(),
                await page.getAttribute('[itemprop="price"]', 'content'),
                await page.url(),
                await page.getAttribute('.ui-pdp-gallery__figure__image', 'src')
            ])
            .then(values => {
                const [{
                        value: firstPromiseValue
                    },
                    {
                        value: secondPromiseValue
                    },
                    {
                        value: thirdPromiseValue
                    },
                    {
                        value: fourthPromiseValue
                    }
                ] = values;
                secondPromiseValue
                items.push({
                    name: firstPromiseValue,
                    price: `$${secondPromiseValue.slice(0, secondPromiseValue.indexOf('.'))}`,
                    url: thirdPromiseValue,
                    img: fourthPromiseValue
                })
            })
        await page.goBack();
    }
    await browser.close();
    return items
}