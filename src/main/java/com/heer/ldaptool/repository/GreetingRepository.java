package com.heer.ldaptool.repository;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.ArrayList;

@Repository
public class GreetingRepository {

    private final List<String> greetings;

    public GreetingRepository() {
        this.greetings = new ArrayList<>();
        // Initialize with some sample greetings
        greetings.add("Hello");
        greetings.add("Hi");
        greetings.add("Greetings");
        greetings.add("Welcome");
        greetings.add("Good day");
    }

    public List<String> findAllGreetings() {
        return new ArrayList<>(greetings);
    }

    public String findRandomGreeting() {
        if (greetings.isEmpty()) {
            return "Hello";
        }
        int randomIndex = (int) (Math.random() * greetings.size());
        return greetings.get(randomIndex);
    }

    public void addGreeting(String greeting) {
        if (greeting != null && !greeting.trim().isEmpty()) {
            greetings.add(greeting.trim());
        }
    }

    public int getGreetingCount() {
        return greetings.size();
    }
}
