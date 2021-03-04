### Setup of https://explorer.nyc21.org on Ubuntu 20.04

    # update and install packages
    apt update
    apt upgrade
    apt install git nginx gcc g++ make npm certbot python3-certbot-nginx
    npm install -g npm
    npm install -g pm2
    
    # add user for nyc-related stuff
    adduser newyorkcoin # leave everything blank if you want
    
    # prep work for ssl certs
    cd /etc/ssl/certs
    openssl dhparam -out dhparam.pem 4096
    
    # get nginx config
    wget https://raw.githubusercontent.com/janoside/nyc-rpc-explorer/master/docs/explorer.nyc21.org.conf
    mv explorer.nyc21.org.conf /etc/nginx/sites-available/

    # get source, npm install
    cd /home/newyorkcoin
    git clone https://github.com/janoside/nyc-rpc-explorer.git
    cd /home/newyorkcoin/nyc-rpc-explorer
    npm install
    
    # startup via pm2
    pm2 start bin/www --name "nyc-rpc-explorer"
    
    # get letsencrypt cert
    certbot --nginx -d explorer.nyc21.org
