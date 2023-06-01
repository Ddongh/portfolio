import openai
import sys
import json

# OpenAI API 키 설정
openai.api_key = sys.argv[2]

# 질문 설정
question = sys.argv[1]

# 대화형 답변 생성 요청
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": question}
    ]
)

# 답변 추출
answer = response.choices[0].message.content.strip()

# JSON 형식으로 응답 생성
json_response = json.dumps({'answer': answer})

# JSON 응답 출력
print(json_response)
