//code to get rid of Goolge Chrome Ajax request error
const readFile = (filePath) => {
	return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest()
			xhr.onloadend = (event) => {
					console.log("xhr.onloadend", event, xhr.status, xhr.statusText, xhr.readyState, xhr);
					if (event.loaded && xhr.response) {
							resolve(xhr.response);
					} else {
							reject("error");
					}
			}
			xhr.open('GET', filePath);
			xhr.send();
	});
} 

$(document).ready(function() {
	cycleTestimonials(1,0);
	$('#start-btn').click(function() {   
			replaceHeading();
			$('#start').fadeOut(500, function() {
					newGame();
					findQuestion();
					loadQuestion();
					$('#quiz').fadeIn(500);
			});
			$('#testimonials').fadeOut(500);
			$('.disclaim').fadeOut(500);
	});
 $('#answer-btn').click(function() {
		 var user_answer = $('input:radio[name=ans]:checked').val();
			if (!user_answer) {
					alert('Please make a selection!');
			} else {
					if (correct(user_answer)) {
						 $('#quiz').fadeOut(500, function() {
									score++;
									updateScore();
									$('.answer-exp').text(quiz_questions[num]["answer-exp"]);
									$('#correct').fadeIn(500);    
							});
					} else {
							$('#quiz').fadeOut(500, function() {
									$('.answer-exp').text(quiz_questions[num]["answer-exp"]);
									$('#wrong').fadeIn(500);
							});
					}
			}
	});
	$('.cont-btn').click(function() {       
			$('#correct').fadeOut(500, function() {
					$('#wrong').fadeOut(500, function() {
							if (count >= count_limit) {
									updateScore();
									updateRank();
									$('#final').fadeIn(500);
							} else {
									findQuestion();
									loadQuestion();
									$('form input').prop('checked', false);
									$('#quiz').fadeIn(500);
							}
					});
			});
	});
	$('#start-over').click(function() {       
			$('#final').fadeOut(500, function() {
					newGame();
					findQuestion();
				loadQuestion();
					$('form input').prop('checked', false);
					$('#quiz').fadeIn(500);    
			});
	});
});

var num = 0;
var count = 0;
var count_limit = 10;
var score = 0;
var prior_questions = [];

var replaceHeading = function() {
	var head = $("<span>Do It For The Culture</span>");
	$('h1').find("span").remove();
	$('h1').append(head);
};
var cycleTestimonials = function(index,prev) {
	$('#testimonials').children('p:eq(' + prev + ')').delay(1800).fadeOut(800, function(){
			$('#testimonials').children('p:eq(' + index + ')').fadeIn(800, function(){
					prev = index;
					if (index === 3){
							index = 0;
					} else {
							index++;
					}
					cycleTestimonials(index,prev);
			});
   });
};
var newGame = function() {
	num = 0;
	count = 0;
	score = 0;
	prior_questions = [];
};
var findQuestion = function() {
	pickQuestion();
	while (wasAsked()) {
			pickQuestion();
	}
};
var pickQuestion = function() {
	var limit = Object.keys(quiz_questions).length;
	num = Math.floor((Math.random() * limit) + 1)
};
var wasAsked = function() {
	var result = false;
	for (var i=0;i<=prior_questions.length;i++){
			if (num == prior_questions[i]) {
					result = true;
			}
	}
	return result;
};
var loadQuestion = function() {
	prior_questions.push(num);    
	$('#icon').html("<i class=\"fa fa-"+quiz_questions[num]["icon"]+"\"></i>");
	$('#text').html(quiz_questions[num]["question"]);
	$('#option-1').html(quiz_questions[num]["options"][1]);
	$('#option-2').html(quiz_questions[num]["options"][2]);
	$('#option-3').html(quiz_questions[num]["options"][3]);
	$('#option-4').html(quiz_questions[num]["options"][4]);
	$('#option-5').html(quiz_questions[num]["options"][5]);
	updateScore();
	count++;
	$('.progress').text(count+"/"+count_limit);
};
var correct = function(user_answer) {
	if (user_answer == quiz_questions[num]["answer"]) {
			return true;
	} else {
			return false;
	}
};
var updateScore = function() {
	$('.score').text(score);
};
var updateRank = function() {
	if (score == 10){
			$('.rank').text('Elite');
			$('.rank-msg').text('Prefect score!)');
	} else if (score >= 7 && score <=  9) {
			$('.rank').text('Impressive');
			$('.rank-msg').text('You gotta it pretty good.');
	} else if (score >= 4 && score <= 6) {
			$('.rank').text('Don Lemon');
			$('.rank-msg').text('You may not be all the way there yet, but you are getting pretty close.');
	} else if (score >= 1 && score <= 3) {
			$('.rank').text('Young Grasshopper');
			$('.rank-msg').text('Much more to learn young one. ');
	} else if (score == 0) {
			$('.rank').text('Nope');
			$('.rank-msg').text('One day..you will be elite...but not today..');
	}
};
var quiz_questions = {
	1: {
			//"icon": "book", change icon to NYC
			"question": "Biggie Smalls is from what borough in New York City?",
			"options": {
					1: "Harlem",
					2: "Washington Heights",
					3: "Uptown",
					4: "Manhattan",
					5: "Brooklyn"
			},
			"answer": 5,
			"answer-exp": "Biggie Smalls was born in 1972 in the Bedford-Stuyvesant neighborhood of Brooklyn."
	},
	2: {
			//"icon": "clock-o", change icon to ballet shoes
			"question": "First African American principal dancer for American Ballet Theatre",
			"options": {
					1: "Arthur Mitchell",
					2: "Janet Collins",
					3: "Michaela DePrince",
					4: "Misty Copeland",
				 5: "Debbie Allen"
			},
			"answer": 4,
			"answer-exp": "On June 30, 2015, Misty Copeland became the first African American principal dancers in ABT(American Ballet Theater) 75 year history. This achievement was groundbreaking for Misty as she was a ballet prodigy only beginning ballet classes at the age of 13."
	 },
	3: {
			 //"icon": "clock-o", change icon to breakdancer
				"question": "Breakdancing is a type of dance that includes...",
			   "options": {
					1: "Soul Trains",
					2: "Juking",
					3: "power moves",
					4: "twerking",
					5: "salsa"
			},
			"answer": 3,
			"answer-exp": "Power moves was created in 1983 by B-boys(breakdancers) living in New York City. Power moves include spins, handstand moves, floats, swipes, and windmills."
	},
	4: {
			//"icon": "bolt", change icon to stevie wonder or music note
			"question": "Stevie Wonder wrote and performed the single, 'Happy Birthday,' in rememberance of which Black activist?",
				"options": {
					1: "Medgar Evers",
					2: "Fannie Lou Hamer",
					3: "Stokely Carmichael",
					4: "Martin Luther King Jr.",
					5: "Shirley Chisholm"
			},
			"answer": 4,
			"answer-exp": "The single, 'Happy Birthday,' was created in to help promote making Martin Luther King Jr.'s birthday a national holiday. Although there was talk of making MLK Jr.'s birthday a national holiday right after he was assassinated, the date was not officiated until almost a decade later in the 80's after this single was released. Stevie Wonder along with Coretta Scott King, (MLK's wife), helped with this initiative."
	},
	5: {
			//"icon": "male", change icon to bounce music
			"question": "What is song created the 'bounce music' sound?",
			"options": {
					1: "Where Dey At?",
					2: "Watch Out For This",
					3: "King of Dancehall",
					4: "Back That Azz Up",
					5: "Pushaman"
			},
			"answer": 1,
			"answer-exp": "The song that is widely regarded as the first bounce music, was the single 'Where Dey At' produced by MC T. Tucker and DJ Irv. Bounce music is based in hip-hop, features heavy bass,and call-and-response vocals. Although the sound was founded in New Orleans during the 80's, it gained more popularity after Hurricane Katrina caused most bounce artists to move to other cities.   "
	},
	6: {
			//"icon": "ship", picture of eartha kitt
			"question": "Female actor who was blacklisted by the FBI and CIA in 1968 after offending the first lady.",
			"options": {
					1: "Octavia Butler",
					2: "Eartha Kitt",
					3: "Diahann Carroll",
					4: "Nichelle Nichols",
					5: "Isabel Sanford"
			},
			"answer": 2,
			"answer-exp": "In 1968, Eartha Kitt was invited to the White House for a luncheon hosted by Lady Bird Johnson. When the first lady asked Eartha her opinion about the Vietnam war, Eartha's comments upset Lady Bird Johnson so much that she cried. President Johnson deemed her as an, 'enemy to be investigated.' "        
	},
	7: {
		 //"icon": "clock-o", 
			"question": "How was the term, 'the underground railroad' originated? ",
			"options": {
					1: "Tice Davids",
					2: "Booker T. Washington",
					3: "Ida B. Wells",
					4: "Harriet Tubman",
					5: "Colson Whitehead"
			},
			"answer": 1,
			"answer-exp": "Tice Davids, a runaway slave from Kentucky, was the inspiration for the first usage of the term “Underground Railroad.” When he swam across the Ohio River to freedom, his former owner assumed he’d drowned and told the local paper if Davids had escaped, he must have traveled on, 'an underground railroad.' (Davids actually made it alive and well.)"
	},
	8: {
			//"icon": "beer", 
			"question": "Who was the first African American woman inducted into the Rock and Roll Hall of Fame?",
			"options": {
					1: "Chaka Khan",
					2: "Whitney Houston",
					3: "Aretha Franklin",
					4: "Tracy Chapman",
					5: "Anita Baker"
			},
			"answer": 3,
			"answer-exp": "Aretha Franklin was inducted into the Hall of Fame in 1987. Not only was she the first African American woman inducted, but she was the first woman. PERIODT. "
	},
	9: {
			//"icon": "car",
			"question": "The 'Carlton Dance,' was influenced by what music video?",
			"options": {
					1: "I Wanna Dance With Somebody",
					2: "Take On Me",
					3: "Can We Talk",
					4: "Dancing In The Dark",
					5: "Can You Stand The Rain"
			},
			"answer": 4,
			"answer-exp": "The running gag of the “Carlton Dance” throughout the show was actually a parody of the dance Courteney Cox did on the Bruce Springsteen music video “Dancing in the Dark” in 1984."
	},
	10: {
			//"icon": "calendar",
			"question": "Where did the tree trunk featured in 'Showtime At The Apollo' come from?",
			"options": {
					1: "Brooklyn, NY",
					2: "An extra stage prop",
					3: "Harlem, NY ",
					4: "Manhattan,NY",
					5: "Long Island City, NY "
			},
			"answer": 3,
			"answer-exp": "The tree trunk, located stage right, was part of a tree that once grew just outside the Harlem Lafayette Theatre, another top spot for African American talent during the Depression era. Underneath its branches is where performers used to gather for their own shot at stardom."
	},
	11: {
			//"icon": "music",
			"question": "What was Spike Lee's inspiration for the movie 'Do The Right Thing?' ",
			"options": {
					1: "Malcolm X writings",
					2: "Musuem of Modern Art",
					3: "The New York Times",
					4: "Alfred Hitchcock Presents",
					5: "Vincent Price film"
			},
			"answer": 4,
			"answer-exp": "Spike Lee got inspiration after watching an episode of 'Alfred Hitchcock Presents, in which the main character discuss how hot weather creates violent tendencies."
	},
	// 12: {
	// 		//"icon": "fighter-jet",
	// 		"question": "",
	// 		"options": {
	// 				1: "a steam-powered train",
	// 				2: "an aircraft carrier",
	// 				3: "a passenger airplane",
	// 				4: "a battleship",
	// 				5: "a zeppelin"
	// 		},
	// 		"answer": 2,
	// 		"answer-exp": "In The Final Countdown (1980), a modern aircraft carrier encounters a strange storm while out on a training mission. Entering the storm transports the carrier through time from 1980 to 1941, arriving the day before the attack on Pearl Harbor. The ships's captain must then decide whether to try to prevent the attack and change history."
	// },
	// 13: {
	// 		"icon": "history",
	// 		"question": "In Michael Crichton's 1999 book <strong>Timeline</strong>, the characters travel to which period in time?",
	// 		"options": {
	// 			 1: "13th Century France",
	// 				2: "15th Century Spain",
	// 				3: "14th Century Scotland",
	// 				4: "13th Century Germany",
	// 				5: "14th Century France"
	// 		},
	// 		"answer": 5,
	// 	 "answer-exp": "The story in Timeline involves a group of history students who travel to 14th Century France to rescue their professor."
	// },
	// 14: {
	// 		"icon": "history",
	// 		"question": "Which television show included an episode in which a character goes back in time and saves Dr. Heimlich from choking - giving the doctor the idea for the Heimlich maneuver?",
	// 		"options": {
	// 				1: "Sliders (1995 &ndash; 2000)",
	// 				2: "Journeyman (2007)",
	// 				3: "Timecop (1997)",
	// 				4: "Quantum Leap (1989 &ndash; 1993)",
	// 				5: "The Time Tunnel (1966 &ndash; 1967)"
	// 		},
	// 		"answer": 4,
	// 		"answer-exp": "In \"Thou Shall Not ...\", a 1989 episode of Quantum Leap (1989 - 1993), the main character (Sam) performs the Heimlich Maneuver on a choking man, who is later revealed to be Henry Heimlich - the inventor of the Heimlich Maneuver."
	// },
	// 15: {
	// 		"icon": "child",
	// 		"question": "Which animated television show, featured time travel adventures, an anthropomorphic dog, and a girl from the future named Cupcake?",
	// 		"options": {
	// 				1: "The Fonz and the Happy Days Gang (1980 &ndash; 1982)",
	// 				2: "Flint the Time Detective (1998 &ndash; 1999)",
	// 				3: "Bill &amp; Ted's Excellant Adventure (1990)",
	// 				4: "Gadget Boy &amp; Heather (1995)",
	// 				5: "Samurai Jack (2001 &ndash; 2004)"
	// 		},
	// 		"answer": 1,
	// 		"answer-exp": "The Fonz and the Happy Days Gang (1980 - 1982) was a Hanna-Barbera animated television series. It was a spin-off of Happy Days and included three of its characters, The Fonz (Henry Winkler), Richie Cunningham (Ron Howard), and Ralph Malph (Donny Most). These characters were joined by an anthropomorphic dog, Mr. Cool, and a girl from the future, Cupcake. The group travel through history in a time machine, trying to get back to 1957 Milwaukee."
	// },
	// 16: {
	// 		"icon": "train",
	// 		"question": "<strong>Time Express (1979)</strong> was a television show about a train that took people on trips through time. Who starred in the show?",
	// 		"options": {
	// 				1: "William Shatner",
	// 				2: "Alan Alda",
	// 				3: "Vincent Price",
	// 				4: "Henry Winkler",
	// 				5: "Danny DeVito"
	// 		},
	// 		"answer": 3,
	// 		"answer-exp": "Time Express was a short-lived television anthology series that was a time travel version of similar anothology shows like Love Boat or Fantasy Island. The train's husband (Vincent Price) and wife hosts would shepard its passengers back in time to relive a crucial point in their lives."
	// },
	// 17: {
	// 		"icon": "rocket",
	// 		"question": "In the <strong>Futurama (1999 - 2013)</strong> episode \"Roswell That Ends Well\" the main character, Fry, sleeps with his grandmother and ends up becoming his own grandfather. Time travel that results in someone becoming their own ancestor is an example of what concept?",
	// 		"options": {
	// 				1: "the butterfly effect",
	// 				2: "a predestination paradox",
	// 				3: "temporal merging",
	// 				4: "quantum entanglement",
	// 				5: "multiple universe theory"
	// 		},
	// 		"answer": 2,
	// 		"answer-exp": "A predestination paradox (also known as a causality loop) is when causation between two or more events form a loop. For example, Fry being his own ancestor is a cause of his own existence, but his existence is required for him to time travel and become his own ancestor."
	// },
	// 18: {
	// 		"icon": "newspaper-o",
	// 		"question": "Which writer was editor of The Sun newspaper and is often credited with being the first to use several science fiction ideas, including time travel in his short stories?",
	// 		"options": {
	// 				1: "Charles Anderson Dana",
	// 				2: "Mark Twain",
	// 				3: "Edward Page Mitchell",
	// 				4: "Charles Dickens",
	// 				5: "Herbert George Wells"
	// 		},
	// 		"answer": 3,
	// 		"answer-exp": "Edward Page Mitchell (1852 - 1927) was a short story writer and editor of a New York newspaper. Mitchell's stories incorporated a number of science fiction concepts before they were used in other works, including stories involving an invisible man in The Crystal Man (1881), time travel in The Clock that Went Backward (1881), faster-than-light travel in The Tachypomp (1874), a thinking computer and a cyborg in The Ablest Man in the World (1879), teleportation in The Man without a Body (1877), and mind transfer in Exchanging Their Souls (1877)."
	// },
	// 19: {
	// 		"icon": "file-text-o",
	// 		"question": "Who coined the term \"time machine\" to describe a mechanism used to transport a traveller through time?",
	// 		"options": {
	// 				1: "Jules Verne",
	// 				2: "Mark Twain",
	// 				3: "William Shakespere",
	// 				4: "Washington Irving",
	// 				5: "Herbert George Wells"
	// 		},
	// 		"answer": 5,
	// 		"answer-exp": "H.G. WELLS (1866 - 1946) was the author of The Time Machine (1895), in which a scientist in Victorian England builds a machine to travel through time. Wells is credited with coining the term \"time machine\" in this work."

	// },
	// 20: {
	// 		"icon": "newspaper-o",
	// 		"question": "What was the name of the television series (1996 - 2000) in which the main character receives a newspaper from one day in the future every day?",
	// 		"options": {
	// 				1: "Tomorrow's Tales",
	// 				2: "The Paradox Papers",
	// 				3: "Next Day News",
	// 				4: "The Day to Come",
	// 				5: "Early Edition"
	// 		},
	// 		"answer": 5,
	// 		"answer-exp": "Early Edition (1996 - 2000) followed the adventures of Gary Hobson (Kyle Chandler) who mysteriously receives the Chicago Sun-Times newspaper the day before it is actually published, and who uses this knowledge to prevent terrible events contained in its pages."

	//}
};

