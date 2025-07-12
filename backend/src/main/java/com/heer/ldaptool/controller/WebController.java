package com.heer.ldaptool.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }
    
    @GetMapping("/ldaptool")
    public String ldaptool() {
        return "forward:/index.html";
    }
}
