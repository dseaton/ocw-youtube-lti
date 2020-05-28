import os
import requests

from isodate import parse_duration
from flask import current_app, Flask, make_response, redirect, render_template, request
from pylti.flask import lti


app = Flask(__name__)
app.config.from_object('config')

def error(exception=None):
    """ render error page
    :param exception: optional exception
    :return: the error.html template rendered
    """
    return render_template('error.html')

@app.route('/is_up', methods=['GET'])
def hello_world(lti=lti):
    """ Indicate the app is working. Provided for debugging purposes.
    :param lti: the `lti` object from `pylti`
    :return: simple page that indicates the request was processed by the lti
        provider
    """
    return render_template('up.html', lti=lti)

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET'])
@lti(request='initial', error=error, app=app)
def index(lti=lti):
    return render_template('index.html')

@app.route('/search', methods=['GET', 'POST'])
@lti(request='session', error=error, app=app)
def search(lti=lti):
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'

    videos = []

    if request.method == 'POST':
        search_params = {
            'key' : current_app.config['YOUTUBE_API_KEY'],
            'q' : request.form.get('query'),
            'part' : 'snippet',
            'maxResults' : 9,
            'type' : 'video',
            'channelId' : 'UCEBb1b_L6zDS3xTUrIALZOw',
        }

        r = requests.get(search_url, params=search_params)

        results = r.json()['items']

        video_ids = []
        for result in results:
            video_ids.append(result['id']['videoId'])

        if request.form.get('submit') == 'lucky':
            return redirect(f'https://www.youtube.com/watch?v={ video_ids[0] }')

        video_params = {
            'key' : current_app.config['YOUTUBE_API_KEY'],
            'id' : ','.join(video_ids),
            'part' : 'snippet,contentDetails',
            'maxResults' : 9,
        }

        r = requests.get(video_url, params=video_params)
        results = r.json()['items']
        for result in results:
            video_data = {
                'id' : result['id'],
                'url' : f'https://www.youtube.com/watch?v={ result["id"] }',
                'thumbnail' : result['snippet']['thumbnails']['high']['url'],
                'duration' : int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
                'title' : result['snippet']['title'],
            }
            videos.append(video_data)
        
        if request.form.get('submit') == 'embed':
            return render_template('reuse.html', error=error)

    return render_template('results.html', videos=videos)

@app.route('/lti/reuse', methods=['GET', 'POST'])
@lti(request='session', error=error, app=app)
def reuse(lti=lti):
    return render_template('reuse.html', error=error)

@app.route('/lti/config.xml', methods=['GET'])
def config(lti=lti):
    # https://stackoverflow.com/questions/27065119/xml-instead-of-html-inside-jinja
    template = render_template('config.xml')
    response = make_response(template)
    response.headers['Content-Type'] = 'application/xml'
    return response

def set_debugging():
    """ enable debug logging
    """
    import logging
    import sys

    root = logging.getLogger()
    root.setLevel(logging.DEBUG)

    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(name)s - %(message)s')
    ch.setFormatter(formatter)
    root.addHandler(ch)

set_debugging()

if __name__ == '__main__':
    app.run(debug=True, threaded=True, port=5000)