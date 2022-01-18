# Map-Tile Server for Lume

## Build

The build process automatically imports styles and fonts into the docker image.  
To build run `docker build .`

## Run

For the Tile Server to run, you first need to download the mbtiles data on your worker. The file is obtainable at [data.maptiler.com](https://data.maptiler.com/downloads/planet/).

Once you have the mbtiles file ready, start the container with:
```sh
docker run \
    --rm -it \
    -v $(pwd)/<yourfile>.mbtiles:/data/mapdata.mbtiles \
    -p 8080:8080 \
    <docker-img-tag>
``` 
You may need to modify the ``pwd`` in the above command if the mbtiles file is not in your current working directory.
