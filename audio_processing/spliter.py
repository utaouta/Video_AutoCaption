# from pydub import AudioSegment
# import math
import os

save_path = "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/"
# def slice_file(start_index,end_index,end_flag,audio):
#
#     audio[start_index*10000:end_index*10000].export("C:/Users/QianChongZi/PycharmProjects/Youtube_downloader/try/audio_segment/%d"%(start_index+1000) +".wav", format="wav")
#     if end_flag:
#         audio[end_index * 10000:].export("C:/Users/QianChongZi/PycharmProjects/Youtube_downloader/try/audio_segment/%d"%(end_index +1000)+".wav", format="wav")
#
#     # audio[start_index * 10000:end_index * 10000].export(path, "segment%d"%end_index+".wav")
#
# def main():
#     start_index = 0
#     end_index = 0
#     audio = AudioSegment.from_mp3("OpenMP.mp3")
#     index = math.floor(len(audio) / 1000 / 10)
#     end_flag = False
#     for i in range(index):
#         start_index = i
#         end_index = i+1
#         if end_index == index:
#          end_flag = True
#         print (start_index, end_index,end_flag,i)
#         slice_file(start_index, end_index, end_flag, audio)
#
# if __name__ == '__main__':
#     main()






def slice_by_silence(start,end,audio):
 print("")
# half slice the audio fragment incase it is too long (>15s)
#     if end - start > 12000:
#         audio[start:(start+end)/2].export(
#             "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/%d" % (start+1000000) + ".wav",
#             format="wav")
#         audio[(start + end)/2:end].export(
#             "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/%d" % (int(int(start+end)/2)+1000000) + ".wav",
#             format="wav")
#
#     else:
#         audio[start:end].export(
#             "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/%d" % (start+1000000) + ".wav",
#             format="wav")

def main():
    from pydub.effects import normalize
    from pydub import AudioSegment, silence
    myaudio  = AudioSegment.from_wav("intro_test.wav")
    # myaudio.export("OpenMP.wav", format="wav")
    normalized_audio = normalize(myaudio)
    silence = silence.detect_silence(normalized_audio, min_silence_len=800, silence_thresh=-50)
    silence = [(start,stop) for start,stop in silence] #convert to sec
    print(silence)
    print(len(silence))
    # del silence[1]
    # print(silence)
    # print(len(silence))

    # if silence[0][0] ==0:
    #     if silence[len(silence)-1][1] == len(normalized_audio):
    #         for i in range(len(silence)-2):
    #             slice_by_silence(silence[i][1],silence[i+1][1],normalized_audio)
    #     else:
    #
    #         for i in range(len(silence)-2):
    #             slice_by_silence(silence[i][1],silence[i+1][1],normalized_audio)
    #         normalized_audio[silence[len(silence)-1][1]:len(normalized_audio)].export(
    #         "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/%d" % (silence[len(silence)-1][1]+1000000) + ".wav",format="wav")
    # else:
    #     normalized_audio[0:silence[0][0]].export(
    #         "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/1000000.wav", format="wav")
    #     normalized_audio[silence[len(silence) - 1][1]:len(normalized_audio)].export(
    #         "C:/Users/QianChongZi/PycharmProjects/FYP_audio_search/try/audio_segment/%d" % (silence[len(silence) - 1][
    #             1]+1000000) + ".wav", format="wav")
    #     for i in range(len(silence)-2):
    #         slice_by_silence(silence[i][1], silence[i + 1][1], normalized_audio)
    #

if __name__ == '__main__':
    main()
