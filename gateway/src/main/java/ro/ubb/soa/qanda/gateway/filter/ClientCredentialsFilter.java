package ro.ubb.soa.qanda.gateway.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UrlPathHelper;
import ro.ubb.soa.qanda.gateway.config.OAuthDetails;

import java.util.Base64;

@Component
public class ClientCredentialsFilter extends ZuulFilter {
	private final OAuthDetails details;

	public ClientCredentialsFilter(OAuthDetails details) {
		this.details = details;
	}

	@Override
	public String filterType() {
		return "pre";
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	@Override
	public boolean shouldFilter() {
		String path = new UrlPathHelper().getPathWithinApplication(RequestContext.getCurrentContext().getRequest());
		return path.startsWith("/oauth");
	}

	@Override
	public Object run() {
		String value = basic(details.getClient(), details.getSecret());
		RequestContext.getCurrentContext().addZuulRequestHeader("authorization", value);
		return null;
	}

	private String basic(String name, String pass) {
		return "Basic " + Base64.getEncoder().encodeToString((name + ":" + pass).getBytes());
	}
}
