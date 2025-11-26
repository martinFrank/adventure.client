#!/bin/sh
envsubst '$VITE_FRONTEND_SUBPATH' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf
tail -n 2000 /etc/nginx/conf.d/default.conf
exec "$@"