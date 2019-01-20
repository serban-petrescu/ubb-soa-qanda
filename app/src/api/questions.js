import { get, post, del, put } from "./base";

export function readPage(skip = 0, limit = 10) {
    return get("/questions?skip=" + skip + "&limit=" + limit);
}

export function createQuestion(data) {
    return post("/questions", data);
}

export function updateQuestion(questionId, text){
    return put("/questions/" + questionId, { text });
}

export function readSingle(id) {
    return get("/questions/" + id);
}

export function answerQuestion(questionId, text) {
    return post("/questions/" + questionId + "/answers", { text });
}

export function updateAnswer(questionId, answerId, text) {
    return put("/questions/" + questionId + "/answers/" + answerId, { text });
}

export function voteAnswer(questionId, answerId, positive) {
    return post("/questions/" + questionId + "/answers/" + answerId + "/vote", { positive });
}

export function unVoteAnswer(questionId, answerId) {
    return del("/questions/" + questionId + "/answers/" + answerId + "/vote");
}