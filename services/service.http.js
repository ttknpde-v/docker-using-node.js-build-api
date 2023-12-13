import express from "express";

class ServiceHttp {
    get application() {
        return express()
    }
}



export default ServiceHttp