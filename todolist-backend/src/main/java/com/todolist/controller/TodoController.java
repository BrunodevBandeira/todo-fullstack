package com.todolist.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.todolist.entity.Todo;
import com.todolist.repository.TodoRepository;
import com.todolist.service.TodoService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/todos")
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
 
    @GetMapping
    List<Todo> list() {
        return todoService.list();
    }
    
    @PostMapping
    List<Todo> create(@RequestBody @Valid Todo todo) {
        return todoService.create(todo);
    }


    @PutMapping
    List<Todo> update(@RequestBody Todo todo) {
        return todoService.update(todo);
    }

    @DeleteMapping("/{id}")
    List<Todo> delete(@PathVariable("id") Long id) {
        return todoService.delete(id);
    }

    
}
