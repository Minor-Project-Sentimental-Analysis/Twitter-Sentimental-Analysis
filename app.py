
import re
import nltk
import pickle
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from keras_preprocessing.sequence import pad_sequences
from keras_preprocessing.text import tokenizer_from_json
import json
import string
import os

import googletrans
from langdetect import detect
from googletrans import Translator

from textblob import TextBlob

from flask import Flask, request
from werkzeug.utils import secure_filename

import snscrape.modules.twitter as sntwitter
import pandas as pd

def user_comment(user):
    try:
        query = f"from:{user}"
        tweets = []
        limit = 10

        #  Remove tweets.csv if it already exists
        # if os.path.exists("./temp/tweets.csv"):
        #     os.remove("./temp/tweets.csv")

        for tweet in sntwitter.TwitterSearchScraper(query).get_items():
            
            if len(tweets) == limit:
                break
            else:
                tweets.append([tweet.content])
                
        df = pd.DataFrame(tweets, columns=['Tweet'])
        # df.to_csv("./temp/tweets.csv", index=False)
        return df
    except Exception as e:
        print(f"An error occurred: {e}")


with open('./tokenizer.json') as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)

#-----------------------------------

def cleaning(text):
    text = str(text).lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('\w*\d\w*', '', text)
    text = re.sub('@\S+', '', text)
    return text

# Perform the Contractions on the reviews.
# Example: it won’t be converted as it will not be
def contractions(text):
 text = re.sub(r"won't", "will not",text)
 text = re.sub(r"could't", "could not",text)
 text = re.sub(r"would't", "would not",text)
 text = re.sub(r"\'d", "would",text)
 text = re.sub(r"can\'t", "can not",text)
 text = re.sub(r"n\'t",  "not", text)
 text = re.sub(r"\'re", "are", text)
 text = re.sub(r"\'s", "is", text)
 text = re.sub(r"\'ll", "will", text)
 text = re.sub(r"\'t", "not", text)
 text = re.sub(r"\'ve", "have", text)
 text = re.sub(r"\'m", "am", text)
 return text

# Remove non-alpha characters

def remove_non_alpha(text):
    tokens = nltk.word_tokenize(text)
    cleaned_tokens = [re.sub('[^A-Za-z]+', '', token) for token in tokens]
    return " ".join(cleaned_tokens)


stop_words = stopwords.words('english')

def remove_stopwords(text):
    tokens = text.split()
    filtered_tokens = [token for token in tokens if token not in stop_words]
    return " ".join(filtered_tokens)

def lemmatizer_on_text(data):
    wordnet_lemmatizer = WordNetLemmatizer()
    words = nltk.word_tokenize(data)
    # Perform lemmatization on each word
    lemmatized_words = [wordnet_lemmatizer.lemmatize(word) for word in words]
    # Join the lemmatized words back into a single string
    lemmatized_sentence = " ".join(lemmatized_words)
    return lemmatized_sentence;

translator = Translator()

def convert_to_english(text):
    try:
        lang = translator.detect(text)
        print(lang)
        if lang.lang == 'en':
            return text
        translation = translator.translate(text, src=lang, dest='en')
        return translation.text
    except Exception as e:
        print(f"An error occurred: {e}")

#-----------------------------------


def spell_check(text):
    try:
        # create a TextBlob object
        blob = TextBlob(text)
        # correct spelling errors using TextBlob's built-in correct() method
        corrected_text = str(blob.correct())
        return corrected_text
    except Exception as e:
        print(f"An error occurred: {e}")
# Transforming abbreviations
abbreviations = {
    u"he's": "he is", 
    u"there's": "there is", 
    u"We're": "We are", 
    u"That's": "That is", 
    u"won't": "will not", 
    u"they're": "they are", 
    u"Can't": "Cannot", 
    u"wasn't": "was not", 
    u"don\x89Ûªt": "do not", 
    u"aren't": "are not", 
    u"isn't": "is not", 
    u"What's": "What is", 
    u"haven't": "have not", 
    u"hasn't": "has not", 
    u"There's": "There is", 
    u"He's": "He is", 
    u"It's": "It is", 
    u"You're": "You are", 
    u"I'M": "I am", 
    u"shouldn't": "should not", 
    u"wouldn't": "would not", 
    u"i'm": "I am", 
    u"I\x89Ûªm": "I am", 
    u"I'm": "I am", 
    u"Isn't": "is not", 
    u"Here's": "Here is", 
    u"you've": "you have", 
    u"you\x89Ûªve": "you have", 
    u"we're": "we are", 
    u"what's": "what is", 
    u"couldn't": "could not", 
    u"we've": "we have", 
    u"it\x89Ûªs": "it is", 
    u"doesn\x89Ûªt": "does not", 
    u"It\x89Ûªs": "It is", 
    u"Here\x89Ûªs": "Here is", 
    u"who's": "who is", 
    u"I\x89Ûªve": "I have", 
    u"y'all": "you all", 
    u"can\x89Ûªt": "cannot", 
    u"would've": "would have", 
    u"it'll": "it will", 
    u"we'll": "we will", 
    u"wouldn\x89Ûªt": "would not", 
    u"We've": "We have", 
    u"he'll": "he will", 
    u"Y'all": "You all", 
    u"Weren't": "Were not", 
    u"Didn't": "Did not", 
    u"they'll": "they will", 
    u"they'd": "they would", 
    u"DON'T": "DO NOT", 
    u"That\x89Ûªs": "That is", 
    u"they've": "they have", 
    u"i'd": "I would", 
    u"should've": "should have", 
    u"You\x89Ûªre": "You are", 
    u"where's": "where is", 
    u"Don\x89Ûªt": "Do not", 
    u"we'd": "we would", 
    u"i'll": "I will", 
    u"weren't": "were not", 
    u"They're": "They are", 
    u"Can\x89Ûªt": "Cannot", 
    u"you\x89Ûªll": "you will", 
    u"I\x89Ûªd": "I would", 
    u"let's": "let us", 
    u"it's": "it is", 
    u"can't": "cannot", 
    u"don't": "do not", 
    u"you're": "you are", 
    u"i've": "I have", 
    u"that's": "that is", 
    u"i'll": "I will", 
    u"doesn't": "does not",
    u"i'd": "I would", 
    u"didn't": "did not", 
    u"ain't": "am not", 
    u"you'll": "you will", 
    u"I've": "I have", 
    u"Don't": "do not", 
    u"I'll": "I will", 
    u"I'd": "I would", 
    u"Let's": "Let us", 
    u"you'd": "You would", 
    u"It's": "It is", 
    u"Ain't": "am not", 
    u"Haven't": "Have not", 
    u"Could've": "Could have", 
    u"youve": "you have",   
    u"donå«t": "do not", 
}
 
def transform_abb(text):
    for emot in abbreviations:
        text = re.sub(u'('+emot+')', " ".join(abbreviations[emot].replace(",","").split()), text)
    return text

  
# Load the five pre-trained models and store them in a list
models = [
    tf.keras.models.load_model('./models/snn_model.h5'),      # Index 0
    tf.keras.models.load_model('./models/cnn_model.h5'),  # Index 1
    tf.keras.models.load_model('./models/lstm_model.h5'),  # Index 2
    tf.keras.models.load_model('./models/bilstm_model.h5'),  # Index 3
    tf.keras.models.load_model('./models/hnn_model.h5'),         # Index 4
]

# Corresponding model names for each index in the 'models' list
model_names = [
    'SNN Model',       # Index 0
    'CNN Model',   # Index 1
    'LSTM Model',   # Index 2
    'BILSTM Model',   # Index 3
    'Hybrid Model',          # Index 4
]




classes = ["Positive","Neutral","Negative"]
app = Flask(__name__)

# @app.route('/predict', methods=['POST'])
# def prediction():
#     data = request.get_json()
#     model_index = data.get('model_index', 4)
#     if model_index < 0 or model_index > 5:
#         model_index = 4
#     model = models[model_index]
    
    
#     s = data.get('text', "I am happy")
#     sequences = tokenizer.texts_to_sequences([s])
#     padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
#     x = model.predict(padded)[0]
#     if model_index % 2 == 0:
#         maxIndex = 0
#         if x[0] < x[1]:
#             maxIndex = 1
#         return classes_twitter[maxIndex] + ", Confidence: " + str(x[maxIndex])
#         # return classes_twitter[np.argmax(x)] + ", Confidence: " + str(x[np.argmax(x)])
#     else:
#         return classes_imdb[np.argmax(x)] + ", Confidence: " + str(x[np.argmax(x)])
# Predict all route
@app.route('/predict_data', methods=['POST'])
def prediction_all():
    data = request.get_json()
    text = data.get('text', None)
    if text is None:
        return jsonify({'error': 'No text provided'})
    
    text =convert_to_english(text)
    text =spell_check(text)
    text = cleaning(text)
    text = contractions(text)
    text = remove_non_alpha(text)
    text = remove_stopwords(text)
    text = lemmatizer_on_text(text)
    unseen_processed = [text]
    unseen_tokenized = tokenizer.texts_to_sequences(unseen_processed)
    unseen_padded = pad_sequences(unseen_tokenized, padding='post', maxlen=100)
    
    results = []
    bestresults = []

    for i in range(len(models)):
        model_name = model_names[i]
        model = models[i]
        pred = model.predict(unseen_padded )[0]
        
        result = {
            'model': model_name,
            'prediction': classes[np.argmax(pred)],
            'confidence': int(max(pred) * 10000) / 100 
        }
        results.append(result)

    sorted_results = sorted(results, key=lambda x: x["confidence"], reverse=True)
    highest_confidence = sorted_results[0]["confidence"]
    highest_prediction = sorted_results[0]["prediction"]
    highest_model = sorted_results[0]["model"]
    bestresults = {
        'model': highest_model,
        'prediction': highest_prediction,
        'confidence': highest_confidence
    }

    return jsonify({'results': results,'best-result':bestresults})

def pred(text):
    text =convert_to_english(text)
    text =spell_check(text)
    text = cleaning(text)
    text = contractions(text)
    text = remove_non_alpha(text)
    text = remove_stopwords(text)
    text = lemmatizer_on_text(text)
    unseen_processed = [text]
    unseen_tokenized = tokenizer.texts_to_sequences(unseen_processed)
    unseen_padded = pad_sequences(unseen_tokenized, padding='post', maxlen=100)
    
    results = []
    bestresults = []

    for i in range(len(models)):
        model_name = model_names[i]
        model = models[i]
        pred = model.predict(unseen_padded )[0]
        
        result = {
            'model': model_name,
            'prediction': classes[np.argmax(pred)],
            'confidence': int(max(pred) * 10000) / 100 
        }
        results.append(result)

    sorted_results = sorted(results, key=lambda x: x["confidence"], reverse=True)
    highest_confidence = sorted_results[0]["confidence"]
    highest_prediction = sorted_results[0]["prediction"]
    highest_model = sorted_results[0]["model"]
    bestresults = {
        'model': highest_model,
        'prediction': highest_prediction,
        'confidence': highest_confidence
    }

    return {'results': results,'best-result':bestresults}


@app.route('/user_tweets', methods=['POST'])
def prediction_all_tweets():
    data = request.get_json()
    user = data.get('user', None)
    if user is None:
        return jsonify({'error': 'No user provided'})
    df=user_comment(user)
    results_all=[]
    for index in df.index:
        row = df.iloc[index]

        results_all.append((row['Tweet'],pred(row['Tweet'])))
    return jsonify({'results-all': results_all})

app.config['UPLOAD_FOLDER'] = 'uploads'


@app.route('/sum', methods=['POST'])
def sum_numbers():
    data = request.get_json()
    numbers = data['numbers']
    result = sum(numbers)
    return jsonify({'result': result})

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World!'

# Define default endpoint
@app.route('/')
def default():
    return jsonify({
        'message': 'Welcome to the Sentiment Analysis API!',
        'endpoints': {
            '/help': 'Provides information about using the API',
            '/predict_data': 'Predicts sentiment of given text for all models',
            '/predict/{model_index}': 'Predicts sentiment of given text for specific model, default is 4',
        },
        'model_names': {
            '0': 'SNN',
            '1': 'CNN',
            '2': 'BILSTM',
            '3': 'HNN',
        }
    })

# Define help endpoint
@app.route('/help')
def help():
    return jsonify({
        'message': 'To predict sentiment of text, send a POST request to /predict with JSON data',
        'json_data': {
            'text': 'Text to analyze (optional, defaults to "I am happy" if not provided)'
        },
        'example': {
            'endpoint': '/predict',
            'JSON data': {
                'text': 'This movie was terrible!'
            }
        },
         'model_names': {
            '0': 'SNN',
            '1': 'CNN',
            '2': 'BILSTM',
            '3': 'HNN',
        }
    })

@app.route('/developer')
def developer_info():
    return "This API is developed by DGK."




if __name__ == '__main__':
    app.run(debug=True)



