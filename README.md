# Map-Tile Server for lume

Map-Tiles service for [hsrm-lume/angular-map-frontend](https://github.com/hsrm-lume/angular-map-frontend).

## Build

The build process automatically imports styles and fonts into the docker image.

[`maptiler-config.json`]([maptiler-config.json) holds the base configuration for the server.

Styles for dark and light theme are located in the [styles](./styles) directory.

Fonts are located in the [font-builder](./font-builder) directory.  
The Fonts have to be preprocessed with [mapbox/node-fontnik](https://github.com/mapbox/node-fontnik) but this step is automated through [Dockerfile](Dockerfile) and [helper script](font-builder/process.js).

To start building run `docker build .`

The [DockerPublish](.github/workflows/docker-publish.yml) GitHub-Action can automatically build and push to the [ghcr.io Registry](https://github.com/hsrm-lume/maptiler-server/pkgs/container/maptiler-server).  
The job automatically runs on the creation of a GitHub release.

## Run

For the Tile Server to run, you first need to download the mbtiles data on your worker.  
The file is obtainable at [data.maptiler.com](https://data.maptiler.com/downloads/planet/).

Once you have the mbtiles file ready, start the container with:

```sh
docker run \
    --rm -it \
    -v $(pwd)/<yourfile>.mbtiles:/data/mapdata.mbtiles \
    -p 8080:8080 \
    <docker-img-tag>
```

You may need to modify the `pwd` in the above command if the mbtiles file is not in your current working directory.
