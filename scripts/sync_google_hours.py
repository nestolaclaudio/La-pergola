"""Fetch La Pergola's Google Business Profile special hours for GitHub Pages."""

import json
import os
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


def request_json(url, *, data=None, headers=None):
    request = Request(url, data=data, headers=headers or {})
    try:
        with urlopen(request, timeout=30) as response:
            return json.loads(response.read())
    except HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Google API returned HTTP {error.code}: {details}") from error


def main():
    client_id = os.environ["GBP_CLIENT_ID"]
    client_secret = os.environ["GBP_CLIENT_SECRET"]
    refresh_token = os.environ["GBP_REFRESH_TOKEN"]
    location_name = os.environ["GBP_LOCATION_NAME"].strip("/")
    if not location_name.startswith("locations/"):
        raise ValueError("GBP_LOCATION_NAME must look like locations/123456789")

    token_response = request_json(
        "https://oauth2.googleapis.com/token",
        data=urlencode({
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        }).encode(),
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    access_token = token_response["access_token"]
    location_url = (
        "https://mybusinessbusinessinformation.googleapis.com/v1/"
        f"{location_name}?readMask=specialHours"
    )
    location = request_json(location_url, headers={"Authorization": f"Bearer {access_token}"})

    open_dates = set()
    closed_dates = set()
    periods = location.get("specialHours", {}).get("specialHourPeriods", [])
    for period in periods:
        start = period.get("startDate", {})
        if not all(key in start for key in ("year", "month", "day")):
            continue
        special_date = date(start["year"], start["month"], start["day"]).isoformat()
        if period.get("closed", False):
            closed_dates.add(special_date)
        else:
            open_dates.add(special_date)

    result = {
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "openDates": sorted(open_dates - closed_dates),
        "closedDates": sorted(closed_dates),
    }
    output_path = Path(__file__).resolve().parents[1] / "availability.json"
    output_path.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
