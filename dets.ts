import axios from 'axios'
import HttpsProxyAgent from 'https-proxy-agent'
import * as readline from 'readline'
import * as fs from 'fs'

class Checker {
    wallets: string[]
    proxies: string[]
    proxyNumber:number

    constructor(wallets: string[], proxies: string[]) {
        this.wallets = wallets
        this.proxies = proxies
        this.proxyNumber = 0
    }

    async sleep(sec: number) {
        return new Promise(resolve => setTimeout(() => resolve(''), sec*1000))
    }
    
    getProxy(proxy: string) {
        const [ip, port, username, password] = proxy.split(':')
        return new HttpsProxyAgent.HttpsProxyAgent(`http://${username}:${password}@${ip}:${port}`)
    }

    async getBalance(wallet: string): Promise<number> {
        const proxy = this.proxies[this.proxyNumber % this.wallets.length]

        try {
            const response = await axios.get('https://api.debank.com/user/total_balance', {
                params: {
                    'addr': wallet
                },
                headers: {
                    'authority': 'api.debank.com',
                    'accept': '*/*',
                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'cache-control': 'no-cache',
                    'origin': 'https://debank.com',
                    'pragma': 'no-cache',
                    'referer': 'https://debank.com/',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'source': 'web',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                    'x-api-nonce': 'n_RT2KhwQF08JA3CwiTUOhUnel9ELZPGHDb2UgZLKh',
                    'x-api-sign': 'd12289cb9d8323edd2584cd25c8d4647e06e921482ec1a7fa657dd864cc5b1f5',
                    'x-api-ts': '1689197778',
                    'x-api-ver': 'v2'
                },
                proxy: proxy? false: undefined,
                httpsAgent: proxy? this.getProxy(proxy): undefined
            })
            
            const balance = response.data.data.total_usd_value.toFixed(2) 
            if(balance) return Number(balance);
            await this.sleep(5)
            return await this.getBalance(wallet)
    
        } catch(e: any) {
            this.proxyNumber++
            if(e.response.data.includes('429')) console.log('Too Many Requests');
            await this.sleep(10)
            return await this.getBalance(wallet)
        }
    }
}

async function read(fileName: string) {
    const array: string[] = []
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity,
    })
    for await (const line of readInterface) {
        array.push(line)
    }
    return array
}

async function main() {
    const wallets = await read('wallets.txt')
    const proxies = await read('proxies.txt') 
    
    const dataStor:{wallet: string, balance: number}[] =[]
    let total = 0

    process.on('SIGINT', () => {
        fs.writeFileSync('logs.txt' ,'')
        dataStor.sort((a,b) => b.balance - a.balance)
        for(let i of dataStor) {
            fs.appendFileSync('logs.txt', `${i.wallet} ${i.balance}\n`)
        }
        fs.appendFileSync('logs.txt', `Total$ ${total}`)
        process.exit(0)
    })

    fs.writeFileSync('logs.txt', '')

    const checker = new Checker(wallets, proxies)

    for(let wallet of wallets) {
        const balance = await checker.getBalance(wallet)
        console.log(`${wallet} ${balance}$`)
        total+=balance; 
        dataStor.push({wallet: wallet, balance: balance})
        fs.appendFileSync('logs.txt', `${wallet} ${balance}$\n`)
    }

    fs.writeFileSync('logs.txt' ,'')
    dataStor.sort((a,b) => b.balance - a.balance)
    for(let i of dataStor) {
        fs.appendFileSync('logs.txt', `${i.wallet} ${i.balance}\n`)
    }

    fs.appendFileSync('logs.txt', `Total$ ${total}`)  
}



main()
