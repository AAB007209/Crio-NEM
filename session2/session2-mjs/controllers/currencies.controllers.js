// Below Importing changed due to Module Usage
import currenciesJson from "./currencies.json" with {type: "json"};

const getCurrencies = (req, res) => {
    const { min_value } = req.params;
    if (min_value) {
        return res.send(
            currenciesJson.data.filter(({ min_size }) => min_size === min_value)
        );
    }
    res.send(currenciesJson.data);
};

const getCurrencyBySymbol = (req, res) => {
    const { symbol } = req.params;
    const reqCurrency = currenciesJson.data.find(
        ({ id }) => id === symbol.toUpperCase()
    );
    if (!reqCurrency)
        // return res.sendStatus(404); // For sending only status code without message
        return res.status(404).send({
            message: `Currency with symbol: '${symbol}' could not be found.`,
        });
    res.send(reqCurrency);
};

// Below Exporting changed because of Module usage
export { getCurrencies, getCurrencyBySymbol };