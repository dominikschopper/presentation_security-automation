# prepararations

- close all programms
- empty all browser tabs
- start presentation in **Chrome**
- start **FFox**
    - open tab for **reports** of **selenium normal**
    - open tab for **reports** of **selenium activescan**
    - open tab for **juiceshop**
- start ZAP as desktop program (Port 8080)
- open four terminals with in **`/docker-demo-zap`**
    - **run this command**: `docker-compose rm juice; docker-compose up juice`

    - **run this command**: `docker-compose rm zap;docker-compose up zap`

    - **run this**: `docker-compose rm selenium`<br/>
      prepare this in terminal: `docker-compose up selenium`

    - **run this**: `docker-compose rm selenium-activescan`<br/>
    prepare this: `docker-compose up selenium-activescan`
