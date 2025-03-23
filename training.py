import torch
import json
from transformers import LlamaForCausalLM, LlamaTokenizer, TrainingArguments, Trainer
from datasets import load_dataset, Dataset
from peft import LoraConfig, get_peft_model


def load_json_dataset(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    formatted_data = []
    for item in data:
        formatted_data.append({
            "instruction": item["input"],
            "response": item["output"]
        })

    return Dataset.from_list(formatted_data)

def tokenize_function(example):
    text = f"### Instruction:\n{example['instruction']}\n\n### Response:\n{example['response']}"
    return tokenizer(text, truncation=True, padding="max_length", max_length=512)


model_name = "meta-llama/Meta-Llama-3-8B"  # Change to "Meta-Llama-3-8B" or "Meta-Llama-3-70B" based on resources
tokenizer = LlamaTokenizer.from_pretrained(model_name)
model = LlamaForCausalLM.from_pretrained(model_name, device_map="auto", load_in_8bit=True)


lora_config = LoraConfig(
    r=16, 
    lora_alpha=32, 
    target_modules=["q_proj", "v_proj"],  
    lora_dropout=0.1, 
    bias="none"
)

model = get_peft_model(model, lora_config)


dataset = load_json_dataset("medical_data.json")  # Replace with your JSON file
tokenized_dataset = dataset.map(tokenize_function, batched=True)

train_dataset = tokenized_dataset.train_test_split(test_size=0.1)["train"]
eval_dataset = tokenized_dataset.train_test_split(test_size=0.1)["test"]


training_args = TrainingArguments(
    output_dir="./llama3_finetuned",
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=3,
    logging_steps=10,
    save_strategy="epoch",
    evaluation_strategy="epoch",
    fp16=True,
    report_to="none" 
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)


trainer.train()


# model.save_pretrained("./fine_tuned_llama3")
# tokenizer.save_pretrained("./fine_tuned_llama3")

print("✅ Fine-tuning completed and model saved!")
