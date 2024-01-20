import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {MenuItem} from "@mui/material";



const Crypto = createContext();


const CryptoContextAPI = ({ children }) => {
    const [currency, setCurrency] = useState("T10Y2Y");
    const [treasurySeries, setTreasurySeries] = useState('daily_treasury_yield_curve')
    const [symbol, setSymbol] = useState("$");
    const [description, setDescription] = useState(null)
    const [seriesName, setSeriesName] = useState(null)
    const [type, setType] = useState("line");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [startDatePlotly, setStartDatePlotly] = useState(new Date());
    const [endDatePlotly, setEndDatePlotly] = useState(new Date());
    const [minDatePlotly, setMinDatePlotly] = useState(new Date());
    const [maxDatePlotly, setMaxDatePlotly] = useState(new Date());
    const [resetParameters, setResetParameters] = useState(null);

    // useEffect(() => {
    //     // if (currency === "WM2NS") setSymbol("$");
    //     // else if (currency === "GDPCA") setSymbol("€");
    //     // else if (currency === "DGS10-T10YIE") setSymbol("¥");
    //     if (currency === "T10Y2Y"){setDescription();
    //                                setSymbol("%");}
    //     else if (currency === "T10Y3M") setSymbol("%") ;
    //     else if (currency === "FEDFUNDS") setSymbol("%");
    //     else if (currency === "DPCREDIT") setSymbol("%");
    //     else if (currency === "SOFR") setSymbol("%");
    //     else if (currency === "LIOR3M") setSymbol("%");
    //     else if (currency === "RRPONTSYD") setSymbol("$Bn");
    //     else if (currency === "M2SL") setSymbol("$Bn");
    //     else if (currency === "M1SL") setSymbol("$Bn");
    //     else if (currency === "M2V") setSymbol("Ratio");
    //     else if (currency === "BAMLH0A0HYM2") setSymbol("%");
    //     else if (currency === "BAMLC0A4CBBB") setSymbol("%");
    //     else if (currency === "DAAA") setSymbol("%");
    //     else if (currency === "DBAA") setSymbol("%");
    //     else if (currency === "WM2NS") setSymbol("$Bn");
    //     else if (currency === "GDPCA") setSymbol("$Bn");
    // }, [currency]);

    useEffect(() => {
            if (currency === "T10Y2Y"){
                setSymbol("%");
                setDescription(
                    "The 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity is a spread that represents the difference in yield between the 10-year Treasury Constant Maturity rate and the 2-year Treasury Constant Maturity rate. The Treasury Constant Maturity rates are a set of benchmark yields for U.S. Treasury securities that are updated daily by the U.S. Treasury.\n\n" +
                    "This spread is closely watched by economists, investors, and policymakers as an indicator of the term structure of interest rates and the market's expectations for future economic conditions. In general, a rising spread indicates that the market expects economic growth and rising inflation, while a falling spread indicates the market expects economic weakness and falling inflation.\n\n" +
                    "The spread is also an important indicator of the slope of the yield curve, which reflects the relationship between short-term and long-term interest rates. A steep yield curve indicates that long-term rates are significantly higher than short-term rates, while a flat yield curve indicates that short-term and long-term rates are similar. The 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity spread can be used to track changes in the slope of the yield curve and to gauge the market's expectations for future interest rate changes.\n\n"
                );
                setSeriesName("10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity");
            }
            else if (currency === "T10Y3M"){
                setSymbol("%");
                setDescription(
                   "The 10-Year Treasury Constant Maturity Minus 3-month Treasury Constant Maturity is a spread that represents the difference in yield between the 10-year Treasury Constant Maturity rate and the 2-year Treasury Constant Maturity rate. The Treasury Constant Maturity rates are a set of benchmark yields for U.S. Treasury securities that are updated daily by the U.S. Treasury.\n\n" +
                    "This spread is closely watched by economists, investors, and policymakers as an indicator of the term structure of interest rates and the market's expectations for future economic conditions. In general, a rising spread indicates that the market expects economic growth and rising inflation, while a falling spread indicates the market expects economic weakness and falling inflation.\n\n" +
                    "The spread is also an important indicator of the slope of the yield curve, which reflects the relationship between short-term and long-term interest rates. A steep yield curve indicates that long-term rates are significantly higher than short-term rates, while a flat yield curve indicates that short-term and long-term rates are similar. The 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity spread can be used to track changes in the slope of the yield curve and to gauge the market's expectations for future interest rate changes."
                );
                setSeriesName("10-Year Treasury Constant Maturity Minus 3-Month Treasury Constant Maturity");
            }
            else if (currency === "FEDFUNDS"){
                setSymbol("%");
                setDescription(
                    "The Federal Funds Effective Rate (FFER) is an average interest rate at which depository institutions lend or borrow overnight balances, also known as federal funds, with each other. The federal funds market is the market in which banks and other depository institutions can lend or borrow funds to meet their reserve requirements set by the Federal Reserve.\n\n" +
                    "The Federal Reserve uses the FFER as one of its tools to implement monetary policy and to influence the overall level of short-term interest rates in the economy. The Federal Reserve sets a target for the federal funds rate, and uses open market operations and other tools to influence the federal funds rate and ensure it remains near the target rate.\n\n" +
                    "The FFER is an average of the rates at which transactions are actually conducted in the federal funds market, rather than a single rate. It is calculated daily by the Federal Reserve Bank of New York based on transactions reported by depository institutions.\n\n" +
                    "The FFER is a key indicator of the health of the financial system and the level of short-term interest rates in the economy. It is closely watched by economists, investors, and policymakers as an indicator of the Federal Reserve's monetary policy stance and the overall level of interest rates in the economy.\n\n"
                );
                setSeriesName("Federal Funds Effective Rate");
            }
            else if (currency === "DPCREDIT"){
                setSymbol("%");
                setDescription(
                    "The Discount Window Primary Credit Rate is a benchmark interest rate set by the Federal Reserve that represents the cost of borrowing funds from the Federal Reserve's discount window. The discount window is a lending facility that provides short-term liquidity to depository institutions in times of stress or during periods of unusual disruptions in the financial markets.\n\n" +
                    "The primary credit rate is the lowest interest rate that the Federal Reserve charges for discount window lending. It is available to depository institutions that are in generally sound financial condition and meet certain other eligibility criteria. The primary credit rate is intended to provide a reliable source of funding to depository institutions and to help ensure stability in the financial markets.\n\n" +
                    "The primary credit rate is set by the Federal Reserve's Board of Governors and can change as the Federal Reserve adjusts its monetary policy stance. The rate is reviewed and adjusted periodically, based on changes in the Federal Reserve's target for the federal funds rate, as well as other economic and financial market conditions.\n\n" +
                    "The discount window is a key component of the Federal Reserve's role in promoting financial stability and providing liquidity to the financial system during periods of stress. By offering funding at a discount to the primary credit rate, the Federal Reserve helps to ensure that depository institutions have access to funding when they need it, which helps to promote stability in the financial markets and support the broader economy.\n\n"
                );
                setSeriesName("Discount Window Primary Credit Rate");
            }
            else if (currency === "SOFR"){
                setSymbol("%");
                setDescription(
                    "The Secured Overnight Financing Rate (SOFR) is a benchmark interest rate that measures the cost of borrowing cash overnight in the U.S. Treasury repurchase agreement (repo) market. The SOFR is designed to be a more robust and transparent benchmark for short-term interest rates, replacing the London Interbank Offered Rate (LIBOR) as the primary benchmark in the U.S.\n\n" +
                    "SOFR is based on actual transactions in the repo market, which is a market for overnight loans of Treasury securities and is used by banks, money market funds, and other financial institutions to manage their cash needs. The SOFR reflects the cost of borrowing cash using Treasury securities as collateral, making it a secured rate.\n\n" +
                    "The Federal Reserve Bank of New York calculates this rate daily, using a broad set of data from the Treasury repo market. The rate is based on all tri-party repo transactions and bilateral repo transactions cleared through the Fixed Income Clearing Corporation (FICC).\n\n" +
                    "SOFR is an important benchmark for the financial markets as it is used as a reference rate for various financial products, including adjustable-rate mortgages, floating-rate loans, and financial derivatives. The move to SOFR is part of a broader effort to improve the robustness and transparency of benchmark interest rates and to provide a more accurate reflection of the cost of borrowing.\n\n"
                );
                setSeriesName("Secured Overnight Financing Rate");
            }
            else if (currency === "LIOR3M"){
                setSymbol("%");
                setDescription(
                    "The 3-month London Interbank Offered Rate (LIBOR) is a benchmark interest rate that represents the average interest rate at which a large number of international banks in London offer to lend funds to one another in the wholesale money market. It is calculated and published on a daily basis by the ICE Benchmark Administration (IBA).\n\n" +
                    "LIBOR is widely used as a reference rate for various financial products, including adjustable rate mortgages, credit cards, student loans, and financial derivatives such as interest rate swaps. It is also used as a benchmark for setting interest rates on corporate loans and bonds.\n\n" +
                    "The 3-month LIBOR is also an important benchmark for the global financial markets and reflects the overall health of the banking sector. A rising 3-month LIBOR indicates a tightening of credit conditions and a reduced availability of funds in the interbank market, while a declining 3-month LIBOR suggests that credit conditions are easing and funds are more readily available.\n\n"
                );
                setSeriesName("3-month London Interbank Offered Rate (LIBOR)");
            }
            else if (currency === "RRPONTSYD"){
                setSymbol("$Bn");
                setDescription(
                    "Overnight reverse repurchase agreements (reverse repos) are a type of financial transaction used by central banks, such as the Federal Reserve, to temporarily manage the supply of reserves in the banking system.\n\n" +
                    "In a reverse repo, the Federal Reserve sells Treasury securities to a counterparty, such as a money market fund, with the agreement to buy the same securities back the next day. The counterparty earns interest on the securities for the overnight period, and the Federal Reserve effectively earns the interest paid on the reverse repo as a way to drain excess reserves from the banking system.\n\n" +
                    "The Federal Reserve uses reverse repos as a tool to regulate the supply of reserves in the banking system and maintain control over short-term interest rates. By selling Treasury securities through reverse repos, the Federal Reserve can reduce the amount of reserves in the banking system and push up short-term interest rates. Conversely, by buying back the securities the next day, the Federal Reserve can add reserves to the banking system and lower short-term interest rates.\n\n" +
                    "Overnight reverse repos are an important part of the Federal Reserve's monetary policy toolkit and are used to achieve its objectives of maximum employment, stable prices, and moderate long-term interest rates.\n\n"
                );
                setSeriesName("Overnight Reverse Repurchase Agreements");
            }
            else if (currency === "M2SL"){
                setSymbol("$Bn");
                setDescription(
                    "M0, M1, M2, and M3 are different measures of the money supply used by central banks and economists to track the amount of money in circulation in an economy.\n\n" +
                    "M0 refers to the most basic measure of the money supply, which includes only physical currency (notes and coins) in circulation.\n\n" +
                    "M1 is a broader measure of the money supply that includes not only physical currency but also demand deposits, which are checking accounts that can be immediately withdrawn as cash.\n\n" +
                    "M2 is a broader measure of the money supply that includes M1 as well as \"near money,\" which are savings deposits, money market securities, and other time deposits that can be easily converted into cash or checking deposits.\n\n" +
                    "M3 is the broadest measure of the money supply that includes M2 as well as large time deposits, institutional money market funds, and other large liquid assets.\n\n" +
                    "These measures of the money supply are used by central banks to monitor the growth of money in an economy and make decisions on monetary policy, such as adjusting interest rates, to control inflation and promote economic growth. They are also used by economists and investors to track the health of the economy and make investment decisions.\n\n"
                );
                setSeriesName("M2 Money Supply");
            }
            else if (currency === "M1SL"){
                setSymbol("$Bn");
                setDescription(
                    "M0, M1, M2, and M3 are different measures of the money supply used by central banks and economists to track the amount of money in circulation in an economy.\n\n" +
                    "M0 refers to the most basic measure of the money supply, which includes only physical currency (notes and coins) in circulation.\n\n" +
                    "M1 is a broader measure of the money supply that includes not only physical currency but also demand deposits, which are checking accounts that can be immediately withdrawn as cash.\n\n" +
                    "M2 is a broader measure of the money supply that includes M1 as well as \"near money,\" which are savings deposits, money market securities, and other time deposits that can be easily converted into cash or checking deposits.\n\n" +
                    "M3 is the broadest measure of the money supply that includes M2 as well as large time deposits, institutional money market funds, and other large liquid assets.\n\n" +
                    "These measures of the money supply are used by central banks to monitor the growth of money in an economy and make decisions on monetary policy, such as adjusting interest rates, to control inflation and promote economic growth. They are also used by economists and investors to track the health of the economy and make investment decisions.\n\n"
                );
                setSeriesName("M1 Money Supply");
            }
            else if (currency === "M2V"){
                setSymbol("Ratio");
                setDescription(
                    "The velocity of M2 money stock is a measure of the rate at which money is being used for transactions in an economy. It is calculated as the nominal GDP divided by the M2 money stock. The M2 money stock includes all currency in circulation, checking deposits, savings deposits, money market securities, and other time deposits. A higher velocity of M2 money stock means that money is being used more frequently for transactions, indicating a more active and healthy economy. On the other hand, a lower velocity of M2 money stock suggests that money is being held more as a store of value and is being used less for transactions, which may indicate a weaker economy."
                );
                setSeriesName("Velocity of M2 Money Stock");
            }
            else if (currency === "BAMLH0A0HYM2"){
                setSymbol("%");
                setDescription(
                    "The ICE BofA US High Yield Index Option-Adjusted Spread (OAS) is a measure of the credit risk in the US high yield bond market. It represents the average difference in yield between high yield bonds and a benchmark, such as US Treasury bonds, adjusted for the changes in the options embedded in the high yield bonds.\n\n" +
                    "The OAS takes into account the optionality of high yield bonds, which may have features such as callable bonds or bonds with sinking funds, which affect their yield. By adjusting for these options, the OAS provides a more accurate representation of the credit risk of high yield bonds.\n\n" +
                    "A higher OAS indicates that high yield bonds are seen as riskier, and therefore offer a higher yield to compensate for the added risk. A lower OAS suggests that high yield bonds are seen as less risky and offer a lower yield. The OAS is a useful indicator for investors and market participants to assess the credit risk in the high yield bond market and make informed investment decisions.\n\n"
                );
                setSeriesName("ICE BofA US High Yield Index Option-Adjusted Spread");
            }
            else if (currency === "BAMLC0A4CBBB"){
                setSymbol("%");
                setDescription(
                    "The ICE BofA BBB US Corporate Index Option-Adjusted Spread (OAS) is a measure of the credit risk in the US BBB-rated corporate bond market. It represents the average difference in yield between BBB-rated corporate bonds and a benchmark, such as US Treasury bonds, adjusted for the changes in the options embedded in the corporate bonds.\n\n" +
                    "The OAS takes into account the optionality of corporate bonds, which may have features such as callable bonds or bonds with sinking funds, which affect their yield. By adjusting for these options, the OAS provides a more accurate representation of the credit risk of BBB-rated corporate bonds.\n\n" +
                    "A higher OAS indicates that BBB-rated corporate bonds are seen as riskier, and therefore offer a higher yield to compensate for the added risk. A lower OAS suggests that BBB-rated corporate bonds are seen as less risky and offer a lower yield. The OAS is a useful indicator for investors and market participants to assess the credit risk in the BBB-rated corporate bond market and make informed investment decisions.\n\n"
                );
                setSeriesName("ICE BofA BBB US Corporate Index Option-Adjusted Spread");
            }
            else if (currency === "DAAA"){
                setSymbol("%");
                setDescription(
                    "The Moody's Seasoned Baa Corporate Bond Yield is a measure of the yield of bonds rated Baa by Moody's Investors Service, one of the largest credit rating agencies in the world. Baa rated bonds are considered to be investment-grade bonds, but with a higher credit risk than higher-rated bonds (e.g. Aaa rated bonds).\n\n" +
                    "The Moody's Seasoned Baa Corporate Bond Yield is calculated as the yield of a representative portfolio of seasoned Baa rated corporate bonds. A seasoned bond is a bond that has been outstanding for a substantial period of time, typically at least one year, and has a well-established yield history. The yield is based on the market prices of the bonds in the portfolio, and is updated regularly to reflect changes in market conditions.\n\n" +
                    "The Moody's Seasoned Baa Corporate Bond Yield is a widely-used benchmark for assessing the yield of investment-grade corporate bonds with moderate credit risk. It is used by investors, financial analysts, and market participants to compare the yield of Baa rated corporate bonds with other types of fixed income securities, such as US Treasury bonds or high-yield bonds.\n\n"
                );
                setSeriesName("Moody's Seasoned Baa Corporate Bond Yield");
            }
            else if (currency === "DBAA"){
                setSymbol("%");
                setDescription(
                    "The Moody's Seasoned Aaa Corporate Bond Yield (DAAA) is a measure of the yield of bonds rated Aaa by Moody's Investors Service, one of the largest credit rating agencies in the world. Aaa rated bonds are considered to have the highest credit quality, with a low credit risk and a high likelihood of timely repayment of principal and interest.\n\n" +
                    "The Moody's Seasoned Aaa Corporate Bond Yield (DAAA) is calculated as the yield of a representative portfolio of seasoned Aaa rated corporate bonds. A seasoned bond is a bond that has been outstanding for a substantial period of time, typically at least one year, and has a well-established yield history. The yield is based on the market prices of the bonds in the portfolio, and is updated regularly to reflect changes in market conditions.\n\n" +
                    "The Moody's Seasoned Aaa Corporate Bond Yield (DAAA) is a widely-used benchmark for assessing the yield of investment-grade corporate bonds with low credit risk. It is used by investors, financial analysts, and market participants to compare the yield of Aaa rated corporate bonds with other types of fixed income securities, such as US Treasury bonds or high-yield bonds.\n\n"
                );
                setSeriesName("Moody's Seasoned Aaa Corporate Bond Yield");
            }
    }, [currency]);

    return (
        <Crypto.Provider value={{currency, setCurrency,
                                treasurySeries, setTreasurySeries,
                                symbol, description, seriesName, type, setType,
                                startDate, setStartDate,
                                endDate, setEndDate,
                                minDate, setMinDate,
                                maxDate, setMaxDate,
                                startDatePlotly, setStartDatePlotly,
                                endDatePlotly, setEndDatePlotly,
                                minDatePlotly, setMinDatePlotly,
                                maxDatePlotly, setMaxDatePlotly,
                                resetParameters, setResetParameters}}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContextAPI;

export const CryptoState = () => {
    return useContext(Crypto);
};

