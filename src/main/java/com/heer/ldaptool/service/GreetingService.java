package com.heer.ldaptool.service;

import com.heer.ldaptool.repository.GreetingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GreetingService {

    private final GreetingRepository greetingRepository;

    public GreetingService(GreetingRepository greetingRepository) {
        this.greetingRepository = greetingRepository;
    }

    public String generatePersonalizedGreeting(String name) {
        if (name == null || name.trim().isEmpty()) {
            name = "World";
        }
        
        String greeting = greetingRepository.findRandomGreeting();
        return greeting + ", " + name + "!";
    }

    public String generateWelcomeMessage() {
        String greeting = greetingRepository.findRandomGreeting();
        return greeting + "! Welcome to the LDAP Tool Spring Boot Application!";
    }

    public List<String> getAllGreetings() {
        return greetingRepository.findAllGreetings();
    }

    public String addNewGreeting(String greeting) {
        greetingRepository.addGreeting(greeting);
        return "Added new greeting: " + greeting;
    }

    public String getGreetingStats() {
        int count = greetingRepository.getGreetingCount();
        return "Total greetings available: " + count;
    }

    public String getFormattedGreeting(String name, String style) {
        String baseGreeting = generatePersonalizedGreeting(name);
        
        return switch (style != null ? style.toLowerCase() : "normal") {
            case "formal" -> "Good day, " + (name != null ? name : "World") + ". How may I assist you today?";
            case "casual" -> "Hey " + (name != null ? name : "there") + "! What's up?";
            case "enthusiastic" -> baseGreeting.toUpperCase() + " 🎉";
            default -> baseGreeting;
        };
    }
}
