from openai import openai
import sys
import json

# OpenAI API 키 설정
# openai.api_key = sys.argv[2]
openai.api_key = "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"

# 질문을 명령줄 인수로 받기
question = sys.argv[1]
# question = "삼성전자에 대해 알려줘"

# GPT 모델 초기화
model = "gpt-3.5-turbo"

# 대화형 요청 생성
response = openai.ChatCompletion.create(
    model=model,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": question},
    ]
)

# 생성된 답변 가져오기
answer = response['choices'][0]['message']['content'].strip()

# JSON 형식으로 답변 출력
output = json.dumps({"answer": answer})
print(output)
