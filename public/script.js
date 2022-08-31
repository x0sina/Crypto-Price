const tbody = document.querySelector("tbody");
const navBarBtn = document.querySelector("#nav-bar-btn");
const navBar = document.querySelector("nav");
const closeNav = document.querySelector("#close-nav");
const root = document.documentElement;
const main = document.querySelector("main");
const darkBtn = document.querySelectorAll(".darktgl");
const globalVol = document.querySelector(".glbvl");
const btcChg = document.querySelector(".btcChg");
const btcPrice = document.querySelector(".btcPrice");
const loaders = document.querySelectorAll(".loader");
let pageN;

function getCryptoList(page) {
    ROU.pageNumber();
    if (!location.pathname.startsWith("/assets/") && !location.pathname.startsWith("/page")) {
        let datas = [];
        axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?include-transparency=true&interval=1d&labels=0&limit=100&quote-currency=USD&start=${page}`)
            .then((res) => {
                loaders.forEach(loader => loader.style.display = "none");
                for (let i = 0; i < 100; i++) {
                    datas.push(res.data.items[i]);
                }
            }).then(() => {
                UI.add100Coins(datas);
                UI.changePage();
                ROU.preventRefresh();
            })
    } else if (location.pathname.startsWith("/page")) {
        let datas = [];
        const lastIndexOf = location.pathname.lastIndexOf('-');
        const pageNumber = location.pathname.substring(lastIndexOf + 1, location.pathname.length);
        axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?include-transparency=true&interval=1d&labels=0&limit=100&quote-currency=USD&start=${(pageNumber - 1) * 100}`)
            .then((res) => {
                loaders.forEach(loader => loader.style.display = "none");
                for (let i = 0; i < 100; i++) {
                    datas.push(res.data.items[i]);
                }
            }).then(() => {
                UI.add100Coins(datas);
                UI.changePage();
                ROU.preventRefresh();
            })
    }
    else {
        ROU.router();
        ROU.preventRefresh();
    }
}
function getSingleOne(symbol) {
    axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?filter=any&interval=1d&quote-currency=USD&symbols=${symbol}`)
        .then(res => ROU.view(res.data.items[0]));
}
function getMarket() {
    axios.get("https://crypto-api-x0sina.vercel.app/data/global?interval=1d&quote-currency=USD")
        .then((res) => {
            UI.addMarketData(res.data);
        })
}
function darkMode() {
    darkBtn.forEach(btn => {
        if (localStorage.getItem("theme") == "dark") {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        btn.addEventListener("click", () => {
            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
            document.body.classList.toggle("dark");
        })
    })
}

class UI {
    static add100Coins(datas) {
        const newTbody = document.querySelector("tbody");
        if (!newTbody) {
            main.innerHTML = `<table class="w-full">
            <thead class="text-sm border-b-2 border-black/20">
                <th class="text-dark/50 font-medium text-sm text-left pl-4 sm:pl-8">
                    CRYPTO
                </th>
                <th class="text-dark/50 font-medium text-sm hidden lg:table-cell pr-12">
                    CIRCULATING SUPPLY
                </th>
                <th class="text-dark/50 font-medium text-sm hidden sm:table-cell pr-12">
                    MARKET CAP
                </th>
                <th class="text-dark/50 font-medium text-sm">
                    CHART
                </th>
                <th class="text-dark/50 font-medium text-sm">
                    PRICE
                </th>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div class="mt-8 px-4 mb-2 font-semibold xl:text-center">
            Pages
        </div>
        <div class="border-t-black/10 border-t-2 mx-4 py-4 flex items-center xl:justify-center gap-x-4 overflow-x-auto px-2">
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    1
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    2
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    3
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    4
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    5
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    6
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    7
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    8
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    9
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    10
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    11
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    12
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    13
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    14
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    15
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    16
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    17
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    18
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    19
                </div>
            </button>
            <button page-change class="flex items-center">
                <div class="px-2 py-1 rounded-lg bg-zinc-400">
                    20
                </div>
            </button>
        </div>`
        }
        document.querySelector("tbody").innerHTML = '';
        datas.forEach(data => {
            this.addToDOM(data);
        });
    }
    static addToDOM(data) {
        let changePct;
        if ((typeof data["1d"]) == "object") {
            changePct = (data["1d"].price_change_pct * 100).toFixed(2);
        } else {
            changePct = "?"
        }
        let price = Number(data.price);
        let marketCap = Number(data.market_cap);
        let circulatingSupply = Number(data.circulating_supply).toLocaleString() + ` ${data.symbol}`;
        const tr = document.createElement("tr");
        tr.classList = "border-black/10 border-b";
        tr.innerHTML = `<td>
        <a data-link href="/assets/${data.symbol}" title="${data.name}" class="px-1 sm:ml-4 text-sm font-bold flex items-center">
        <img loading="lazy" class="w-7 h-7 sm:mr-4 mx-2" onerror="this.src = '/images/errorImg.png';"
            src="${data.logo_url}" alt="${data.name}">
        <div class="flex flex-col">
            <span class="font-extrabold text-base w-full text-left">
                ${data.name}
            </span>
            <div class="flex items-center">
                <span class="bg-gray-200 text-gray-600 text-xs rounded-md px-1.5 py-0.5">
                    ${data.rank}
                </span>
                <span class="text-gray-600 text-xs mx-1 font-bold">
                    ${data.symbol}
                </span>
                <svg class="${changePct <= 0 ? 'rotate-180' : ''}" width="10" height="10" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.2758 4.99995L3.27577 24C3.10053 24.3035 3.00812 24.6477 3.00781 24.9982C3.0075 25.3487 3.0993 25.6931 3.274 25.9969C3.4487 26.3007 3.70018 26.5533 4.00324 26.7294C4.3063 26.9054 4.65029 26.9987 5.00077 27H27.0008C27.3512 26.9987 27.6952 26.9054 27.9983 26.7294C28.3014 26.5533 28.5528 26.3007 28.7275 25.9969C28.9022 25.6931 28.994 25.3487 28.9937 24.9982C28.9934 24.6477 28.901 24.3035 28.7258 24L17.7258 4.99995C17.5518 4.69603 17.3007 4.44346 16.9978 4.26781C16.6949 4.09215 16.3509 3.99963 16.0008 3.99963C15.6506 3.99963 15.3067 4.09215 15.0037 4.26781C14.7008 4.44346 14.4497 4.69603 14.2758 4.99995V4.99995Z"
                        fill="${changePct <= 0 ? '#ef4444' : '#4ADE80'}" stroke="${changePct <= 0 ? '#ef4444' : '#4ADE80'}" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span class="text-xs text-gray-600">
                    ${changePct}%
                </span>
            </div>
        </div>
        </a>
    </td>
    <td class="hidden text-[#000000cc] font-bold lg:table-cell pr-12">
        ${circulatingSupply}
    </td>
    <td class="hidden text-[#000000cc] dark:text-white font-bold sm:table-cell pr-12">
        ${marketCap >= 10000000000 ? (marketCap / 1000000000).toFixed(2) + " Bn" : marketCap >= 100000000 ? (marketCap / 1000000000).toFixed(3) + " Bn" : marketCap >= 100000 ? (marketCap / 1000000).toFixed(3) + "M" : marketCap}
    </td>
    <td class="font-bold text-sm">
        <img loading="lazy" src="https://nomics.com/images/sparkline/assets/${data.id}-USD-1d.svg" alt="${data.id} chart">
    </td>
    <td>
        <span class="font-bold sm:mx-6 text-[#000000cc] dark:text-white">$${price <= 0.0001 ? price.toFixed(7).toLocaleString("en-US") : price <= 0.001 ? price.toFixed(5).toLocaleString("en-US") : price <= 0.1 ? price.toFixed(4).toLocaleString("en-US") : price <= 5 ? price.toFixed(3).toLocaleString("en-US") : Number(price.toFixed(2)).toLocaleString("en-US")}</span>
    </td>`

        document.querySelector("tbody").appendChild(tr);
    }
    static addMarketData(market) {
        const mktCap = (Number(market.market_cap) / 1000000000000).toFixed(2);
        const pctChange = (Number(market.market_cap_change_pct) * 100).toFixed(2);
        const mktChg = document.querySelector("#mkt-chg");
        const volChg = (Number(market.volume) / 100000000).toFixed(2);
        document.querySelector("#mkt-cap").innerHTML = `$${mktCap}T`;
        mktChg.innerHTML = `${pctChange}%`;
        if (pctChange < 0) {
            mktChg.style.color = "rgb(255, 0 ,21)";
        } else if (pctChange > 0) {
            mktChg.style.color = "rgb(0,200,90)";
        }
        root.style.setProperty("--bg-color", pctChange <= -0.25 ? "255, 0 ,21" : pctChange <= 0 && pctChange <= 0.25 ? "119, 0, 255" : "20, 255, 169");
        globalVol.innerText = `${volChg}B`;
        axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?filter=any&interval=1d&quote-currency=USD&symbols=BTC`)
        .then(d => {
            const data = d.data.items[0];
            btcPrice.innerText = "$" + Number(data.price).toLocaleString();
            if (Number(data["1d"].price_change_pct).toFixed(2) < 0) {
                btcChg.style.color = "rgb(255, 0 ,21)";
            } else if (Number(data["1d"].price_change_pct).toFixed(2) > 0) {
                btcChg.style.color = "rgb(0,200,90)";
            }
            btcChg.innerText = Number(data["1d"].price_change_pct).toFixed(2) + "%";
        });

    }
    static changePage() {
        const changePageBtns = document.querySelectorAll("button[page-change]");
        changePageBtns.forEach(chgBtns => {
            chgBtns.addEventListener("click", btn => {
                loaders.forEach(loader => loader.style.display = "block");
                const numClicked = Number(btn.target.innerText);
                history.pushState(null, null, (`/page-${numClicked}`));
                getCryptoList((numClicked - 1) * 100);
            })
        })
    }
}


class ROU {

    static router() {
        let locationLastIndex = location.pathname.lastIndexOf('/') + 1;
        let path = location.pathname.substring(locationLastIndex, location.pathname.length);
        getSingleOne(path);
    }

    static preventRefresh() {
        const routeTags = document.querySelectorAll("a[data-link]");
        routeTags.forEach(route => {
            route.addEventListener("click", e => {
                main.innerHTML = "";
                e.preventDefault();
                this.navigateTo(route.href);
            })
        });
    }

    static navigateTo(url) {
        history.pushState(null, null, url);
        ROU.router();
    }

    static view(asset) {
        loaders.forEach(loader => loader.style.display = "none");
        main.innerHTML = "";
        if (asset) {
            let changePct;
            console.log(asset["1d"].price)
            if ((typeof asset["1d"]) == "object") {
                changePct = (asset["1d"].price_change_pct * 100).toFixed(2);
            } else {
                changePct = "?"
            }
            const price = Number(asset.price);
            main.classList += "py-4 px-6 relative mb-12 sm:px-8 sm:py-6 lg:px-10 lg:py-8";
            main.innerHTML = (`
            <div class="font-semibold my-3">Home / 
                <a href="/assets/${asset.symbol}" class="font-normal">${asset.symbol}</a>
            </div>
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold">${asset.name} <span class="font-semibold text-gray-500 text-lg">(${asset.symbol})</span></h1>
                <img class="w-12 h-12" src="${asset.logo_url}" alt="${asset.name} logo">
            </div>
            <div class="flex items-end gap-x-2">
            <div>
                <h2 class="font-semibold">${asset.symbol} Price</h2>
                <span class="font-bold text-2xl">$${price <= 0.0001 ? price.toFixed(7).toLocaleString("en-US") : price <= 0.001 ? price.toFixed(5).toLocaleString("en-US") : price <= 0.1 ? price.toFixed(4).toLocaleString("en-US") : price <= 5 ? price.toFixed(3).toLocaleString("en-US") : Number(price.toFixed(2)).toLocaleString("en-US")}</span>
            </div>
            <div class="flex items-center gap-x-2 pb-1">
            <svg class="${changePct <= 0 ? 'rotate-180' : ''}" width="13" height="13" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.2758 4.99995L3.27577 24C3.10053 24.3035 3.00812 24.6477 3.00781 24.9982C3.0075 25.3487 3.0993 25.6931 3.274 25.9969C3.4487 26.3007 3.70018 26.5533 4.00324 26.7294C4.3063 26.9054 4.65029 26.9987 5.00077 27H27.0008C27.3512 26.9987 27.6952 26.9054 27.9983 26.7294C28.3014 26.5533 28.5528 26.3007 28.7275 25.9969C28.9022 25.6931 28.994 25.3487 28.9937 24.9982C28.9934 24.6477 28.901 24.3035 28.7258 24L17.7258 4.99995C17.5518 4.69603 17.3007 4.44346 16.9978 4.26781C16.6949 4.09215 16.3509 3.99963 16.0008 3.99963C15.6506 3.99963 15.3067 4.09215 15.0037 4.26781C14.7008 4.44346 14.4497 4.69603 14.2758 4.99995V4.99995Z"
                        fill="${changePct <= 0 ? '#ef4444' : '#4ADE80'}" stroke="${changePct <= 0 ? '#ef4444' : '#4ADE80'}" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span class="font-semibold text-gray-600">
                    ${changePct}%
                </span>
            </div>
            </div>
            <img class="w-40 sm:w-56 md:w-64 lg:w-80 right-4 sm:right-6 md:right-8 lg:right-10 blur-filter absolute top-[135px]" src="https://nomics.com/images/backgrounds/assets/${asset.id}-USD-1d.svg?p=1661947500000" alt="${asset.symbol} chart">
            <div class="p-2 mt-8 border-y-2 text-center sm:justify-center border-black/10 overflow-x-auto flex items-center gap-x-6">
                <div class="flex flex-col">
                    <div class="text-gray-500 text-sm font-light">
                        RANK
                    </div>
                    <span class="text-center font-bold">#${asset.rank}</span>
                </div>
                <div class="flex flex-col">
                    <div class="text-gray-500 text-sm font-light">
                        MARKET CAP
                    </div>
                    <span class="text-center font-bold">$${Number(asset.market_cap).toLocaleString()}</span>
                </div>
                <div class="flex flex-col">
                    <div class="text-gray-500 text-sm font-light">
                        VOLUME
                    </div>
                    <span class="text-center font-bold">$${Number(asset["1d"].volume).toLocaleString()}</span>
                </div>
                <div class="flex flex-col">
                    <div class="text-gray-500 text-sm font-light w-max">
                        CIRCULATING SUPPLY
                    </div>
                    <span class="text-left font-bold">${Number(asset.circulating_supply).toLocaleString()} ${asset.symbol}</span>
                </div>
            </div>
            <h3 class="text-xl font-bold mt-8 text-center">${asset.symbol} DAILY PERFORMANCE</h3>
            <p class="mt-6 dark:text-white text-[#00000080] text-lg sm:w-4/5 mx-auto md:w-3/5">
               Today ${asset.name} price is ${Number(asset.price).toLocaleString()}$ which is ${changePct}% over the last 24 hours, ${asset.name}'s market cap is ${Number(asset.market_cap).toLocaleString()}. 24 hour ${asset.symbol} volume is ${Number(asset["1d"].volume).toLocaleString()}. ${asset.name} rank in crypto market is ${asset.rank}.
            </p>
        `)
        } else {
            main.innerHTML = `<p>Assest not found</p>`
        }
    }

    static pageNumber() {
        let locationLastIndex = location.pathname.lastIndexOf('-') + 1;
        let path = Number(location.pathname.substring(locationLastIndex, location.pathname.length));
        if (isNaN(typeof path)) pageN = 0;
        else pageN = Number(path);
    }

}


document.addEventListener("DOMContentLoaded", () => {
    getCryptoList(0);
    getMarket();
    UI.changePage();
    ROU.pageNumber();
    darkMode();
});

navBarBtn.onclick = () => {
    navBar.style.right = 0;
}
closeNav.onclick = () => {
    navBar.style.right = "-100%";
}

window.addEventListener("popstate", () => getCryptoList(pageN * 100));