package rs.ac.uns.ftn.informatika.udd.backend.lucene.model;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

public final class ResultData {
	
	private String title;
	private String keywords;
	private String location;
	private String highlight;
	private String text;
	private String authorFName;
	private String authorLName;
	private String genre;
	private String latitude;
	private String longitude;
	
	public ResultData() {
		super();
	}

	public ResultData(String title, String keywords, String location, 
			String highlight, String text, String first, String last, String genre,
			String latitude, String longitude) {
		super();
		this.title = title;
		this.keywords = keywords;
		this.location = location;
		this.highlight = highlight;
		this.text = text;
		this.authorFName = first;
		this.authorLName = last;
		this.genre = genre;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getAuthorFName() {
		return authorFName;
	}

	public void setAuthorFName(String authorFName) {
		this.authorFName = authorFName;
	}

	public String getAuthorLName() {
		return authorLName;
	}

	public void setAuthorLName(String authorLName) {
		this.authorLName = authorLName;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getHighlight() {
		return highlight;
	}

	public void setHighlight(String highlight) {
		this.highlight = highlight;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	

}
