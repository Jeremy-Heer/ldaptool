package com.heer.ldaptool.controller;

import com.heer.ldaptool.service.GreetingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class HelloController {

    private final GreetingService greetingService;

    public HelloController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/")
    public String home() {
        return greetingService.generateWelcomeMessage();
    }

    @GetMapping("/hello")
    public String hello() {
        return greetingService.generatePersonalizedGreeting("Spring Boot User");
    }

    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return greetingService.generatePersonalizedGreeting(name);
    }

    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "World") String name) {
        return greetingService.generatePersonalizedGreeting(name);
    }

    @GetMapping("/greet/{name}")
    public String greetWithStyle(@PathVariable String name, 
                                @RequestParam(defaultValue = "normal") String style) {
        return greetingService.getFormattedGreeting(name, style);
    }

    @GetMapping("/greetings")
    public List<String> getAllGreetings() {
        return greetingService.getAllGreetings();
    }

    @GetMapping("/stats")
    public String getStats() {
        return greetingService.getGreetingStats();
    }

    @PostMapping("/greetings")
    public String addGreeting(@RequestParam String greeting) {
        return greetingService.addNewGreeting(greeting);
    }
}
