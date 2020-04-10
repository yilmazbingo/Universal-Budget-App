# Universal-Budget-App
### Firebase with Redux

We do not want our components communicating with the firebase. They should not even know firebase is our database choice. The components should be completely unaware of where the data is coming from and where it is really going to. The components should be just concerned with the presentation of information and basic user interaction. So we are gonna change our actions. Our filters action will not be saved to firebase. We need to tweak how our action generators work. 
