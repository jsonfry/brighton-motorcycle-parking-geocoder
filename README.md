# Brighton Motorcyle Parking Geocoder

Brighton and Hove City Council provide details on (free!) motorcycle parking on [their website](https://www.brighton-hove.gov.uk/content/parking-and-travel/parking/motorcycle-bay).

Sadly they only provide a [pdf list of road names](https://www.brighton-hove.gov.uk/sites/brighton-hove.gov.uk/files/Brighton%20%26%20Hove%20Motorcycle%20Bays%2013-09-03.pdf), which is great but limiting in that you need to know the names of all the roads for it to be helpful.

This script reads in a text file (`/road-names`) with a list of the road names, talks to [Google's geocoding API](https://developers.google.com/maps/documentation/geocoding/intro), and outputs a lovely json file (`/bays.json`) commited in this repo for ease of use!

The `/road-names` file was created by copying and pasting the contents of the council provided pdf and manually deleting the zone headings.

## How do I run it myself?

1. [Install Docker](https://docs.docker.com/engine/installation/)
2. Run `docker-compose up`
