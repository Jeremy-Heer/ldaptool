package com.heer.ldaptool.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    @Bean
    public OpenAPI ldapToolOpenAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:" + serverPort);
        server.setDescription("LDAP Tool API Server");

        Contact contact = new Contact();
        contact.setName("LDAP Tool Support");
        contact.setEmail("support@ldaptool.com");

        License license = new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
                .title("LDAP Search API")
                .version("1.0.0")
                .description("A dynamic LDAP search API providing ldapsearch command-line equivalent functionality. " +
                           "This API allows you to perform LDAP searches against any LDAP server by specifying " +
                           "connection parameters, search criteria, and authentication details dynamically. " +
                           "Use Basic Authentication to provide LDAP bind credentials (DN and password).")
                .contact(contact)
                .license(license);

        // Define Basic Auth security scheme
        SecurityScheme basicAuthScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("basic")
                .description("Basic Authentication using LDAP bind DN as username and password");

        return new OpenAPI()
                .info(info)
                .servers(List.of(server))
                .addSecurityItem(new SecurityRequirement().addList("basicAuth"))
                .schemaRequirement("basicAuth", basicAuthScheme);
    }
}
