from pytrends.request import TrendReq


def get_google_trends(keyword: str):
    pytrends = TrendReq(
        hl="en-US",
        tz=330,
        timeout=(10, 25)
    )

    pytrends.build_payload(
        kw_list=[keyword],
        timeframe="today 3-m",
        geo="IN",
        gprop=""
    )

    data = pytrends.interest_over_time()

    if data.empty:
        return {
            "keyword": keyword,
            "values": [],
            "average": 0,
            "growth": 0
        }

    values = data[keyword].tolist()

    average = sum(values) / len(values)

    first = values[0]
    last = values[-1]

    if first > 0:
        growth = ((last - first) / first) * 100
    else:
        growth = 0

    return {
        "keyword": keyword,
        "values": values,
        "average": round(average, 2),
        "growth": round(growth, 2)
    }