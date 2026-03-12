<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CV</title>
    <style>
      @page { margin: 14mm; }
      body {
        font-family: DejaVu Sans, Arial, Helvetica, sans-serif;
        font-size: 11px;
        color: #0f172a;
        line-height: 1.35;
      }
      h1 { font-size: 18px; margin: 0 0 4px 0; }
      h2 { font-size: 12px; margin: 14px 0 6px 0; text-transform: uppercase; letter-spacing: 0.08em; color: #0f766e; }
      .muted { color: #475569; }
      .row { display: flex; gap: 16px; }
      .col { flex: 1; }
      .box {
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 10px 12px;
      }
      .header { display: flex; gap: 14px; align-items: center; }
      .avatar {
        width: 72px;
        height: 72px;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
      }
      .avatar img { width: 100%; height: 100%; object-fit: cover; }
      .links a { color: #0f766e; text-decoration: underline; word-break: break-all; }
      ul { margin: 0; padding-left: 14px; }
      .list { margin: 0; padding: 0; list-style: none; }
      .list li { margin: 0 0 4px 0; }
      .skill-grid { columns: 2; column-gap: 18px; }
      .skill { break-inside: avoid; margin: 0 0 4px 0; }
      .small { font-size: 10px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="avatar">
        @if(!empty($profile->avatar_url))
          <img src="{{ $profile->avatar_url }}" alt="Avatar" />
        @endif
      </div>
      <div style="flex:1">
        <h1>{{ $profile->full_name }}</h1>
        @if(!empty($profile->title))
          <div class="muted">{{ $profile->title }}</div>
        @endif
        <div class="muted small">
          @if(!empty($profile->location)) {{ $profile->location }} @endif
          @if(!empty($profile->years_of_experience)) · {{ $profile->years_of_experience }} ans d'expérience @endif
        </div>
      </div>
    </div>

    @if(!empty($profile->short_bio))
      <h2>Profil</h2>
      <div class="box" style="white-space: pre-line;">{{ $profile->short_bio }}</div>
    @endif

    <h2>Liens</h2>
    <div class="box links">
      <ul class="list">
        @if(!empty($profile->email))
          <li><strong>Email :</strong> <a href="mailto:{{ $profile->email }}">{{ $profile->email }}</a></li>
        @endif
        @if(!empty($profile->phone))
          <li><strong>Téléphone :</strong> <a href="tel:{{ $profile->phone }}">{{ $profile->phone }}</a></li>
        @endif
        @if(!empty($profile->github_url))
          @php($githubUrl = str_starts_with($profile->github_url, 'http') ? $profile->github_url : 'https://'.$profile->github_url)
          <li><strong>GitHub :</strong> <a href="{{ $githubUrl }}">{{ $profile->github_url }}</a></li>
        @endif
        @if(!empty($profile->linkedin_url))
          @php($linkedinUrl = str_starts_with($profile->linkedin_url, 'http') ? $profile->linkedin_url : 'https://'.$profile->linkedin_url)
          <li><strong>LinkedIn :</strong> <a href="{{ $linkedinUrl }}">{{ $profile->linkedin_url }}</a></li>
        @endif
        @if(!empty($profile->website_url))
          @php($websiteUrl = str_starts_with($profile->website_url, 'http') ? $profile->website_url : 'https://'.$profile->website_url)
          <li><strong>Portfolio :</strong> <a href="{{ $websiteUrl }}">{{ $profile->website_url }}</a></li>
        @endif
      </ul>
    </div>

    @if(!empty($educations) && count($educations) > 0)
      <h2>Formation</h2>
      <div class="box">
        <ul class="list">
          @foreach($educations as $edu)
            <li style="margin-bottom:8px; break-inside: avoid;">
              <div><strong>{{ $edu->institution }}</strong></div>
              <div class="muted small">
                {{ collect([$edu->degree, $edu->field])->filter()->join(' · ') }}
              </div>
              <div class="muted small">
                {{ $edu->start_year ?? '?' }} - {{ $edu->end_year ?? '?' }}
              </div>
              @if(!empty($edu->description))
                <div class="small">{{ $edu->description }}</div>
              @endif
            </li>
          @endforeach
        </ul>
      </div>
    @endif

    @if(!empty($skills) && count($skills) > 0)
      <h2>Compétences</h2>
      <div class="box">
        @php
          $languageSkills = collect($skills)->filter(fn($s) => strtolower(trim($s->category ?? '')) === 'langage' || strtolower(trim($s->category ?? '')) === 'language')->pluck('name')->sort()->values();
          $frameworkSkills = collect($skills)->filter(fn($s) => strtolower(trim($s->category ?? '')) === 'framework')->pluck('name')->values();
          $toolSkills = collect($skills)->reject(fn($s) => in_array(strtolower(trim($s->category ?? '')), ['langage','language','framework']))->pluck('name')->values();

          $mainFrameworks = collect(['Laravel', 'React.js', 'Next.js']);
          $mainFrameworkSkills = $mainFrameworks->filter(fn($n) => $frameworkSkills->contains($n))->values();
          $otherFrameworkSkills = $frameworkSkills->reject(fn($n) => $mainFrameworks->contains($n))->sort()->values();

          $databaseSkills = $toolSkills->filter(fn($n) => preg_match('/(sql|mysql|postgres|sqlite)/i', $n))->values();
          $otherTools = $toolSkills->reject(fn($n) => preg_match('/(sql|mysql|postgres|sqlite)/i', $n))->sort()->values();
        @endphp

        <div class="row">
          <div class="col">
            @if($languageSkills->count() > 0)
              <div style="margin-bottom:10px;">
                <strong>Langages</strong>
                <div class="muted">{{ $languageSkills->join(' · ') }}</div>
              </div>
            @endif
            @if($mainFrameworkSkills->count() > 0)
              <div style="margin-bottom:10px;">
                <strong>Frameworks principaux</strong>
                <div class="muted">{{ $mainFrameworkSkills->join(' · ') }}</div>
              </div>
            @endif
            @if($otherFrameworkSkills->count() > 0)
              <div style="margin-bottom:10px;">
                <strong>Autres frameworks utilisés</strong>
                <div class="muted">{{ $otherFrameworkSkills->join(' · ') }}</div>
              </div>
            @endif
          </div>
          <div class="col">
            @if($databaseSkills->count() > 0)
              <div style="margin-bottom:10px;">
                <strong>Bases de données</strong>
                <div class="muted">{{ $databaseSkills->join(' · ') }}</div>
              </div>
            @endif
            @if($otherTools->count() > 0)
              <div>
                <strong>Outils</strong>
                <div class="muted">{{ $otherTools->join(' · ') }}</div>
              </div>
            @endif
          </div>
        </div>
      </div>
    @endif

    @if(!empty($projects) && count($projects) > 0)
      <h2>Projets principaux</h2>
      <div class="box">
        <ul class="list">
          @foreach(collect($projects)->take(4) as $project)
            <li style="margin-bottom:8px; break-inside: avoid;">
              <div><strong>{{ $project->title ?? $project->name ?? 'Projet' }}</strong></div>
              @if(!empty($project->stack))
                <div class="muted small">{{ $project->stack }}</div>
              @elseif(!empty($project->technologies))
                <div class="muted small">{{ $project->technologies }}</div>
              @endif
              @if(!empty($project->description))
                <div class="small">{{ $project->description }}</div>
              @elseif(!empty($project->short_description))
                <div class="small">{{ $project->short_description }}</div>
              @endif
            </li>
          @endforeach
        </ul>
      </div>
    @endif

    @if(!empty($languages) && count($languages) > 0)
      <h2>Langues</h2>
      <div class="box">
        <ul class="list">
          @foreach($languages as $lang)
            <li>
              <strong>{{ $lang->name }}</strong>
              @if(!empty($lang->level))
                <span class="muted"> - {{ $lang->level }}</span>
              @endif
            </li>
          @endforeach
        </ul>
      </div>
    @endif
  </body>
</html>
