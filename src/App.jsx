import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { motion, AnimatePresence } from "framer-motion";

/* 🔤 FONT */
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

/* 🔥 DATA */
const data = [
  {
    eventName: "Australia Nada Sagara",
    continent: "Australia",
    lat: -33.857198,
    lng: 151.2151234,
    date: "6th Apr 2015", // Add event date here
    description: "A spiritual musical gathering in Australia.",
    images: [
      "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/553877589_10162263725688450_6645432744307704072_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f798df&_nc_ohc=1bq4JiblzZMQ7kNvwGY7WyW&_nc_oc=AdogFIA6e_oGGq4KRoUELxqi8SlS8ccU1W_EQm_iXrZ8z9KuRvSR72sPqwC7KXU-acJuEnX_X2MxlzAdUOknSIVZ&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=5DUAXXX_tANbj3MloZTvBg&_nc_ss=7a32e&oh=00_AfzhAUPwT8rrFmvgEY76nzhZoszk8fittraY7o1DaIt-Zw&oe=69C58787",
      "https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-6/555126158_10162263998798450_2980780587593436447_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f798df&_nc_ohc=va9Z5npXmmoQ7kNvwEienuK&_nc_oc=AdrmX_qkSNxPPNV7O2qLvpkcV4MfXBzK2TTl0BgTtvwEZahJU1DouKQxP9WVG6ITRN0JtHKsLLLFOuPnP2M_jgov&_nc_zt=23&_nc_ht=scontent.fdel11-2.fna&_nc_gid=5s5GfW_lKQ_jB0GJwAnlSA&_nc_ss=7a32e&oh=00_AfwUhGyqaAA8T0QxLxRoDBIOUqjCQS4inMN4DQ-Gd5NvIw&oe=69C543A1",
      "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/555730424_10162263727233450_5151751377914141755_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f798df&_nc_ohc=gCaSKSYUllMQ7kNvwEsxj-B&_nc_oc=AdprQnp3af8yufgBnfYGIkiKIO9dvr-PyWmP-adq9euB6ZtONS4PGbrLNFzAPwr2raEYwZbZOb7kgGMDcgorezhn&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=-9T9iw1O2V8PfpxkCCLimA&_nc_ss=7a32e&oh=00_Afy_4ZkkIOlWtaOssi1zUz2BwSqnVdNJvEBvVRHTC_Ze3g&oe=69C595EE",
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/554082427_10162263725493450_310762851806448915_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f798df&_nc_ohc=Qy6ZSJXDjT0Q7kNvwFBmx6g&_nc_oc=AdrfHCP_cTBkTnELvI2-tElz5JiUw3o90zDYQRAmZa2Q6CHw6GPZvW9ltEoBz1nqwOylQwefJ8D6ybVxxtrls4lC&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=jjMy6oGgLxWdxjdjL79HBg&_nc_ss=7a32e&oh=00_AfxMyqPKYFocUysZdDpBMZFeC9LhzuM6jOCg4eLUywqQZQ&oe=69C581B8",
      "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/555367302_10162263727523450_8982032303139924699_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f798df&_nc_ohc=UO9ZEXHyGIUQ7kNvwGE3Bbs&_nc_oc=AdoYtzCdekibt4ZoSTwgwAh_0bgnNlxhk14y2nDHwcwnUF-K2ShKrQH_HxIIV936f7SqHFtFHL2Tp6GugXB-F9U_&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=Z1Ly_4FGM8uOt9TbY9aOyw&_nc_ss=7a32e&oh=00_AfxYsbErLPl7E1Xx0UkE8Ub45EXZ-VnAHfMMXtJfhDHUYw&oe=69C59CB1",
    ],
    audio: "",
  },
  {
    eventName: "Tenjo no Ongaku (Japan)",
    continent: "Asia",
    lat: 35.7066,
    lng: 139.6164,    date: "4th May 2016", // Add event date here    description: "Celestial music rooted in Japan.",
    images: [
      "https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/555464770_10162277206973450_3701726185590379082_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=3pxfRENRXA4Q7kNvwFtmAeg&_nc_oc=Adp3c8jplzxEAgq7gtCV3t3yXUWoVJ2JIH89BfJluIfcIULWBEjl_LFOt9eXBjVS623spy-GU0z9d0DFWncpZvcA&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=Zqwgcpb0jBE5I-WU9jnr5Q&_nc_ss=7a32e&oh=00_AfwVF7biObao9sUam5OVIwkWrMkzVmppg8OXCntdlAJNGQ&oe=69C56968",
      "https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/555472046_10162277206588450_765477887528970061_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f798df&_nc_ohc=e6hIMbTGDWUQ7kNvwHGPFUp&_nc_oc=AdrWcqWUhioR_mth6_thxjlVY21Vyskc2PLums7kRpx3CCx6lA5bIcxISX1nOhHeOsUGXa07ZQoQH-Gr-4OsWkp-&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=efXmUCuNoYfKcYgVFgCWzQ&_nc_ss=7a32e&oh=00_AfzeMK_ES9T7MivzPgn8GNa_j8bA47jWVuqymXm3Yz1POQ&oe=69C570AE",
      "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/556105793_10162277207043450_2035904150884389800_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f798df&_nc_ohc=_VKWrBvblH4Q7kNvwH0o-cJ&_nc_oc=Adp7g1jYxiUUat0CakGnp44cftt8kJ18Coa63rDFbyB8wBhHzLiwL74ey03Be8VcszGR9fPr4jkXSSIj6kfZq_Mi&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=TWreBUrkKfYqKqGnB2C1vw&_nc_ss=7a32e&oh=00_AfyHGySeofFN5wiU3pvRoIiorLV3EK8WK2ZZ-5Aah5jqvQ&oe=69C58DE9",
      "https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/556951387_10162277206758450_4259696845708773051_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=2AAPFZBXyEQQ7kNvwHCkjyd&_nc_oc=Adr9XcMZzs0ex2aIVzZ5ARtgR0gve5ZZhcBZlQeVHj-DWT6Ly9Q1xGzF3RMaH4CKCz_0s1mMBFk3V5s8RHZO2r6O&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=NWKFEvMnNy_tTo-Pzztmsg&_nc_ss=7a32e&oh=00_AfxAU6KHOpo-uU2lBvRjEbDAoJ_Uahr_n3uqJ1eMZbvuEA&oe=69C592FA",
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/554471808_10162277207128450_8651215798492477272_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=KlhWiyhgT_kQ7kNvwGk_Ax_&_nc_oc=Adr0sPJs3tRLE6YAati4n-qDtGcTLu63YW8D2JPBlBDMVimLI3sNpqFd4VOClE8CfWxtko8eViZtxdkajFhvtu4U&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=d67NEh1Rm3VnuivZYMUEtg&_nc_ss=7a32e&oh=00_AfzZhW_gYBUMo7IACmnr1MeZBDyq33vmGsGWV-RkvpuBAA&oe=69C59388",
    ],
    audio: "",
  },
  {
    eventName: "Nada Gita Raga Sagara (Taiwan)",
    continent: "Asia",
    lat: 23.7939,
    lng: 120.5,    date: "31st Dec 2017", // Add event date here    description: "A classical Indian music gathering in the heart of Taiwan",
    images: [
      "https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/471607817_10161195904133450_42355983245731971_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=qTNRC5lOIMMQ7kNvwFQNsNT&_nc_oc=AdqioxGFCHCqgAIvpScU72WySMNRTTmbY_SGWp798h9IKUmHEIRkssNrcvIn79-yRNW4yYvSI6yjjEszr585BS8G&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=OHzxAXVQh800AL9WKG3YlA&_nc_ss=7a32e&oh=00_AfxPLJ6zfl096l5WNvlO66aaFQfo5sMxGQhNR53CoeLz7Q&oe=69C59EDF",
      "https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-6/557994630_10162328012528450_185389893646513667_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f798df&_nc_ohc=xtbrI1Uve10Q7kNvwHHFTL8&_nc_oc=AdpVkK9JvXmeHZmIZtgH4DNvvXtkOB1Gxuw3nZfP5oGRz5TM-ho8WGXRQvLQhWRH76OkYwqbXP05QA1RUNUmzyn&_nc_zt=23&_nc_ht=scontent.fdel11-2.fna&_nc_gid=zNzzsbykQ_3OFJSH-1tq_A&_nc_ss=7a32e&oh=00_Afxd4378vhqyyLdtPqqSZhMGxcsDeVaJ9ZFY-ggiGcW35g&oe=69C59A16",
      "https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-6/557608612_10162328012468450_2018673051645408323_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f798df&_nc_ohc=Fy0UJdzF2VUQ7kNvwEFTLhY&_nc_oc=AdqN-kIgWzw0-K2Pjb42o39VMSjtL89iQf9kHpogkTUYQJ3lPaU1g2ZFKgON5UAL29BJ8LDGjPf30d8-fERfpGTY&_nc_zt=23&_nc_ht=scontent.fdel11-2.fna&_nc_gid=K2oyAT7J39I--0ydoLKCjw&_nc_ss=7a32e&oh=00_AfwOP2HVbr0w8QOxNmQysgou5dTIZXjWzEpyFFnTpaNwag&oe=69C59368",
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/557741552_10162328012798450_6121429682572092414_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=iL-1yjRcZK0Q7kNvwFtaIvN&_nc_oc=Adov4nX73mhyigfH2v37OChSiOUaHyb8vPw9BhIPPE8OIFnOTz0i0-L__vIQ8Z2cDTcxsycg4akHOShBttzj8o2r&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=84uOGFAfx8Y3nZES5ARmnw&_nc_ss=7a32e&oh=00_AfxzHaOLJu_tKEGOmuoOr2WYINOygpQhJAL_9o_oZ0PGdg&oe=69C5937A",
    ],
    audio: "",
  },
  {
    eventName: "Kala Traya Raga Sagara (Hyderabad)",
    continent: "Asia",
    lat: 17.5963,
    lng: 78.4097,
    date: "24th Mar 2018",
    description: "A classical Indian music gathering in the heart of Hyderabad",
    images: [
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/468447611_10161084319473450_5726509136628705608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=x4dkxjo417cQ7kNvwFHCulc&_nc_oc=AdrBY9b5DwjNFe1ZYpEuOJkG1qJNS3yJb-votc5vWDlo4Hg-E74rDJFW_11cYdofML4S0ENGOoqnvpPNGDzlVqJ-&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=L_0EdkPa7y_PFVUOODRcMQ&_nc_ss=7a32e&oh=00_AfwE59qxKmn25M75Oix6INiRaFrZgTTEBFvMmilJqq7Bmw&oe=69C56A5A",
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/468508886_10161084320253450_2254242866051295486_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=EJ94RRmd5HsQ7kNvwGKPviG&_nc_oc=AdpQHHvT2aLO1eOJMrcHLTcFjDkQorfuTb4v4uCLSEdAs_k9nD2YR62ULv91FTNzAk_cN1TdITLW9p-V-qk69Y8l&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=LqKTeQN7yYipts2vdQc-7Q&_nc_ss=7a32e&oh=00_AfzS3zKQlO-u19y_86nWVXyq-Nz69KwFn1F31UN0bMf3iQ&oe=69C56AB7",
      "https://scontent.fdel11-1.fna.fbcdn.net/v/t39.30808-6/472007620_10161205494588450_627050699602036322_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f798df&_nc_ohc=TC_HYo5JKJUQ7kNvwGprbzk&_nc_oc=Adr_V1KzcH6Ka5y92vvj1YB7JHXCkldf342LyNYb0wmK6HeT1mCREczoxdEQE9GXplB6JaJCTj_Rm2yVBzOHbnaw&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=fnDYRiLa7drqhEI9B5hbOg&_nc_ss=7a32e&oh=00_AfyKuX4U-G5hnNffNtUmigioiwlqDi_mnEE3E-Ps2H72Yw&oe=69C57C4E",
      "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/468407753_10161084320268450_2134971483147402875_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f798df&_nc_ohc=JQ2KhEk-fWMQ7kNvwGK3UA6&_nc_oc=AdrfTYdI_atd6eUT6zsXpyvb1TmW9-WEsOVBeVoJhPdz5lSepKsqNPo3dI7N9k1QzkVu4_lkB-fffaB_mgR-ZMKi&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=TOn4Ab4b0FK9UlW91ok5uA&_nc_ss=7a32e&oh=00_AfzSjwuPyXisr13yxsJdVyYIdCPerssvxV3suH35QdvGDw&oe=69C574E8",
      "https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-6/468652279_10161084319483450_882133102900266131_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f798df&_nc_ohc=BmAo037pG9sQ7kNvwHy3uMw&_nc_oc=AdqLRvZl5MiqGOE-dpJz7Td0gsYghNHVZfbZBwVWZvGBqlkvXLHxNTSvm3UyjrQ0iYBAz4Z5mzX0gzy_4N4O5hTC&_nc_zt=23&_nc_ht=scontent.fdel11-2.fna&_nc_gid=RuSGExkGWkXae6jIeBRePA&_nc_ss=7a32e&oh=00_AfwiYVtRLs8voMegvLDn8TaJe3E_dReiRZhK_FKplwUEQA&oe=69C59A07",
    ],
    audio: "/audio/Hyderabad Sample.mp3",
  },
];
const continents = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Australia",
];

export default function App() {
  const globeRef = useRef();
  const bgAudioRef = useRef();

  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUserActive, setIsUserActive] = useState(false);

  const filteredData =
    selectedContinent === null
      ? data
      : data.filter((d) => d.continent === selectedContinent);

  /* 🎧 FADE FUNCTIONS */
  const fadeOut = (audio) => {
    if (!audio) return;
    let vol = audio.volume;

    const fade = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audio.volume = vol;
      } else {
        audio.pause();
        clearInterval(fade);
      }
    }, 50);
  };

  const fadeIn = (audio) => {
    if (!audio) return;
    audio.volume = 0;
    audio.play();

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 50);
  };

  /* 🌍 AUTO ROTATE */
  useEffect(() => {
    let frame;

    const rotate = () => {
      if (!globeRef.current || isUserActive) return;

      const pov = globeRef.current.pointOfView();
      globeRef.current.pointOfView({
        lat: pov.lat,
        lng: pov.lng + 0.05,
        altitude: pov.altitude,
      });

      frame = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(frame);
  }, [isUserActive]);

  /* 👆 USER ACTIVITY */
  useEffect(() => {
    let timer;

    const handleActivity = () => {
      setIsUserActive(true);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsUserActive(false);
      }, 5000);
    };

    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("mousemove", handleActivity);

    return () => {
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
    };
  }, []);

  /*  CONTINENT ZOOM */
  useEffect(() => {
    if (!globeRef.current || !selectedContinent) return;
    const center = getContinentCenter(selectedContinent);
    globeRef.current.pointOfView(
      { lat: center.lat, lng: center.lng, altitude: 2 },
      1500
    );
  }, [selectedContinent]);

  /* 🎵 START BACKGROUND AUDIO */
  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.5;
      bgAudioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* 🌌 STARS */}
      <div style={styles.stars}></div>
      <div style={styles.stars2}></div>
      <div style={styles.stars3}></div>

      {/* 🪔 LOGOS */}
      <img src="https://i.imgur.com/NCG14fi.png" style={styles.logo} />
      <img
        src="https://i.imgur.com/BWrqXa8.png"
        style={{ ...styles.logo, right: 30, left: "auto" }}
      />

      {/* ✨ TITLE */}
      <div style={styles.title}>Raga Sagara Global Healing Journey</div>

      {/* 🌍 GLOBE */}
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={filteredData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.02}
        pointRadius={1.2}
        pointColor={() => "#ffcc00"}
        pointLabel={(point) => `<div style="background: rgba(0,0,0,0.9); padding: 10px 15px; border-radius: 8px; color: #ffd700; font-size: 14px; font-family: Philosopher, serif; white-space: nowrap; border: 2px solid #ffd700;">${point.eventName}</div>`}
        onPointClick={(point) => {
          setSelectedEvent(point);
          fadeOut(bgAudioRef.current);
        }}
      />

      {/* 🔽 FILTER */}
      <div style={styles.filter}>
        <button
          onClick={() => setSelectedContinent(null)}
          style={{
            ...styles.button,
            background: selectedContinent === null ? "#ffd700" : "#ffffff",
          }}
        >
          All
        </button>
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedContinent(c)}
            style={{
              ...styles.button,
              background: selectedContinent === c ? "#ffd700" : "#ffffff",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 📸 MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            style={styles.modal}
          >
            <div style={styles.modalHeader}>
              <div>
                <h2>{selectedEvent.eventName}</h2>
                <p style={{ color: "#ffd700", fontSize: "14px", margin: "5px 0 0 0" }}>📅 Date: {selectedEvent.date}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  fadeIn(bgAudioRef.current);
                }}
              >
                ✕
              </button>
            </div>

            <div style={styles.contentWrapper}>
              {/* LEFT */}
              <div style={styles.leftPane}>
                <div style={styles.carousel}>
                  {selectedEvent.images.map((img, i) => (
                    <div key={i} style={styles.slide}>
                      <img src={img} style={styles.image} />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div style={styles.rightPane}>
                <h3 style={styles.sectionTitle}>About Event</h3>
                <p style={styles.description}>{selectedEvent.description}</p>

                <h3 style={styles.sectionTitle}>Main Raga</h3>
                <p style={styles.raga}>To be updated</p>

                {selectedEvent.audio && (
                  <>
                    <h3 style={styles.sectionTitle}>Listen</h3>
                    <audio controls autoPlay style={{ width: "100%" }}>
                      <source src={selectedEvent.audio} />
                    </audio>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
  },

  logo: {
    position: "absolute",
    top: 30,
    left: 30,
    height: "100px",
    zIndex: 20,
    background: "transparent",
    mixBlendMode: "screen",
  },

  title: {
    position: "absolute",
    top: 30,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#ffd700",
    fontSize: "20px",
    fontFamily: "'Philosopher', serif",
  },

  filter: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },

  button: {
    padding: "12px 18px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "none",
  },

  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    color: "#fff",
    zIndex: 20,
  },

  modalHeader: {
    position: "absolute",
    top: 20,
    left: 30,
    right: 30,
    display: "flex",
    justifyContent: "space-between",
  },

  contentWrapper: {
    position: "absolute",
    top: 80,
    bottom: 20,
    left: 20,
    right: 20,
    display: "flex",
    gap: 20,
  },

  leftPane: {
    flex: 2,
    borderRadius: "12px",
    overflow: "hidden",
  },

  rightPane: {
    flex: 1,
    background: "rgba(0,0,0,0.75)",
    padding: "20px",
    borderRadius: "12px",
  },

  sectionTitle: {
    color: "#ffd700",
    marginBottom: "10px",
  },

  description: {
    fontSize: "18px",
    marginBottom: "20px",
  },

  raga: {
    fontSize: "18px",
    marginBottom: "20px",
  },

  carousel: {
    display: "flex",
    height: "100%",
    overflowX: "auto",
  },

  slide: {
    minWidth: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  stars: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat",
  },
  stars2: { position: "absolute", width: "100%", height: "100%", opacity: 0.5 },
  stars3: { position: "absolute", width: "100%", height: "100%", opacity: 0.3 },
};

/* 🌍 CONTINENT CENTER */
function getContinentCenter(continent) {
  switch (continent) {
    case "Asia":
      return { lat: 34, lng: 100 };
    case "Europe":
      return { lat: 54, lng: 15 };
    case "Africa":
      return { lat: 0, lng: 20 };
    case "North America":
      return { lat: 40, lng: -100 };
    case "South America":
      return { lat: -15, lng: -60 };
    case "Australia":
      return { lat: -25, lng: 135 };
    default:
      return { lat: 20, lng: 0 };
  }
}
