# mavrck-assignment
Implementation of the Mavrck's take home assigment. Skills to demonstrate:
* Software Development
* System Design
* DevOps


## Prompt
Imagine you are a member of Mavrck's Engineering Team. You have been asked to lead development of a new full-stack project. Implement the following requirements as you would in a professional environment using industry-standard best practices. You may use any libraries, platforms, and tools you wish, and you’re encouraged to do so in a manner that reflects the depth of your experience.

Requirements:

* A team of software engineers can productively collaborate on this codebase.
* A client application can input an Instagram handle and receive a JSON response that contains:
  - Datetime data was last retrieved from Instagram
  - Instagram account's biography
  - Instagram account's full name
  - Instagram account's followers count
  - Instagram account's most recent post, including its:
    - Media URL
    - Number of likes
    - Number of comments
    - Post type, e.g. carousel, image, or video

Note: Data may be cached for up to 1 hour, but clients must be provided with a method to request the latest data.

Hint! Instagram has a public, rate-limited API that returns a JSON response. To retrieve an account, for instance, append ?__a=1 to the URL.

Account: https://www.instagram.com/mavrckco/?__a=1
Post: https://www.instagram.com/p/CL-IAeIMD0O/?__a=1


