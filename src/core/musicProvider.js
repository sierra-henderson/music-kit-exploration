export default class MusicProvider {
  static createInstance() {
    if (!MusicProvider.instance) {
      MusicProvider.instance = new MusicProvider();
    }
    return MusicProvider.instance
  }

  configure() {
    window.MusicKit.configure({
      developerToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNHVEw4N1U4WE0ifQ.eyJpc3MiOiIyUVJWOUpSSjJNIiwiaWF0IjoxNTkwODcxNzcyLjc5NCwiZXhwIjoxNjA2NjQ3NzcyLjc5NH0.9M4ZmGzLyhVAzilQA-MMhZmyaBZ3W7QmAz98Ab06U1ngkrbomZ-lAfdnjLQs4J9RG0w1XO7OJ7OBqUgOO070Vg",
      app: {
        name: 'MT Match',
        build: '1978.4.1'
      }
    });
  }

  getInstance() {
    return window.MusicKit.getInstance();
  }
}
