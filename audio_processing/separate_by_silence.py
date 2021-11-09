from pydub import AudioSegment,silence

from pydub.effects import normalize



myaudio = intro = AudioSegment.from_wav("OpenMP.wav")
# myaudio.export("OpenMP.wav", format="wav")
normalized_audio = normalize(myaudio)
silence = silence.detect_silence(normalized_audio, min_silence_len=800, silence_thresh=-50)


silence = [((start/1000),(stop/1000)) for start,stop in silence] #convert to sec
print (silence)
print(len(silence))
trans = silence[1][1]
print(trans)





# from pydub import AudioSegment
# from pydub import effects
# _sound = AudioSegment.from_file("OpenMP.mp3", "mp3")
# sound = effects.normalize(_sound)
# sound.export("new_open.mp3", format="mp3")

# from pydub import AudioSegment
# from pydub.effects import normalize
#
# # Import target audio file
# loud_then_quiet = AudioSegment.from_file("first_half.wav")
#
# # Normalize target audio file
# normalized_loud_then_quiet = normalize(loud_then_quiet)
# normalized_loud_then_quiet.export("fuck.wav", format("wav"))