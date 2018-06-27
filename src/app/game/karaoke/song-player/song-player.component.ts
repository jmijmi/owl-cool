import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SongInform } from '../models';

@Component({
    selector: 'app-game-karaoke-song-player',
    templateUrl: './song-player.component.html',
    styleUrls: ['./song-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongPlayerComponent implements OnInit {

    @Input() song: SongInform;

    public currentTime: number;
    public isPlaying = false;

    constructor() {
    }

    public ngOnInit() {
    }

    public playPauseAudio( status: boolean ) {
        this.isPlaying = status;
    }

    public updateAudioTime( time: number ) {
        this.currentTime = time;
    }

    public handleSpeechFound( text: string ): void {
        console.log(text);
    }
}