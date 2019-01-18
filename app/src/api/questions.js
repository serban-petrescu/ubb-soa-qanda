import { get, post } from "./base";

export function readPage(skip = 0, limit = 10) {
    return get("/questions?skip=" + skip + "&limit=" + limit);
}

export function createQuestion(data) {
    return post("/questions", data);
}

export function readSingle(id) {
    return get("/questions/" + id);
}

export function answerQuestion(questionId, text) {
    return post("/questions/" + questionId + "/answers", { text });
}