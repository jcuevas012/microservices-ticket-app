#!/bin/bash

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=$jwt_key