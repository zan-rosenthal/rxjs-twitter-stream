import {
  appen,
  propEq
} from 'ramda'
import twitterClient from 'twit'
import Rx from 'rx'
import config from './twitter-config.js'
const client = new twitterClient(config)
const stream = client.stream('statuses/sample')

const twitterStream = Rx.Observable.fromEvent(stream, 'tweet')

const observerA = {
    onNext: (tweet) => console.log(tweet),
    onError: (err) => console.log(err),
    onComplete: () => console.log(complete),
}

const subject = new Rx.Subject

const cutPassage= (t) => {
  const l = t.length - 1
  const i1 = Math.random() * l
  const i2 = Math.random() * (l - i1) + i1

  return t.slice(i1, i2).join(' ')
}

subject
.map(cutPassage)
.subscribe(observerA)

twitterStream.filter(propEq('lang', 'en'))
  .pluck('text')
  .map((t) => t.split(' '))
  .subscribe(subject)
