package com.todolist;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.todolist.entity.Todo;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TodolistApplicationTests {

	/*
	 * WebTestClient => é uma versão assincrona do restTemplate
	 * restTemplate => é sincrono
	 */

	@Autowired
	private WebTestClient webTestClient;

	@Test 
	void testeCreateTodoSuccess() {
		var todo = new Todo("Todo 01", "desc todo 01", false, 1);

		webTestClient
		.post()
		.uri("/todos")
		.bodyValue(todo)
		.exchange()
		.expectStatus()
		.isOk()
		.expectBody()
		.jsonPath("$").isArray()
		.jsonPath("$.length()").isEqualTo(36)
		.jsonPath("$[0].nome").isEqualTo(todo.getNome())
		.jsonPath("$[0].descricao").isEqualTo(todo.getDescricao())
		.jsonPath("$[0].realizado").isEqualTo(todo.isRealizado())
		.jsonPath("$[0].prioridade").isEqualTo(todo.getPrioridade());

	}


	@Test
	void testeCreateTodoFailure() {
					webTestClient
		.post()
		.uri("/todos")
		.bodyValue(new Todo("", "", false, 0))
		.exchange()
		.expectStatus()
		.isBadRequest();

	}

}
